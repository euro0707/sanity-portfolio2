interface RateLimitEntry {
  count: number
  resetTime: number
}

class TTLMap<K, V> {
  private store = new Map<K, V>()
  private timers = new Map<K, NodeJS.Timeout>()

  set(key: K, value: V, ttl: number): void {
    this.clear(key)
    this.store.set(key, value)
    const timer = setTimeout(() => this.clear(key), ttl)
    this.timers.set(key, timer)
  }

  get(key: K): V | undefined {
    return this.store.get(key)
  }

  has(key: K): boolean {
    return this.store.has(key)
  }

  clear(key: K): boolean {
    const timer = this.timers.get(key)
    if (timer) {
      clearTimeout(timer)
      this.timers.delete(key)
    }
    return this.store.delete(key)
  }

  clearAll(): void {
    this.timers.forEach(timer => clearTimeout(timer))
    this.timers.clear()
    this.store.clear()
  }

  size(): number {
    return this.store.size
  }
}

const rateLimitStore = new TTLMap<string, RateLimitEntry>()

export interface RateLimitResult {
  ok: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
}

export function rateLimit(
  key: string, 
  limit = 60, 
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  
  if (!entry || now >= entry.resetTime) {
    const resetTime = now + windowMs
    rateLimitStore.set(key, { count: 1, resetTime }, windowMs)
    
    return {
      ok: true,
      remaining: limit - 1,
      resetTime
    }
  }
  
  if (entry.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000)
    }
  }
  
  entry.count++
  rateLimitStore.set(key, entry, entry.resetTime - now)
  
  return {
    ok: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime
  }
}

export function getClientIP(request: Request): string {
  // Try multiple headers for IP detection
  const headers = [
    'x-forwarded-for',
    'x-real-ip', 
    'x-client-ip',
    'cf-connecting-ip',
    'x-forwarded'
  ]
  
  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // Take first IP if comma-separated
      const ip = value.split(',')[0].trim()
      if (ip && ip !== 'unknown') {
        return ip
      }
    }
  }
  
  return '127.0.0.1'
}

// Cleanup function for graceful shutdown
export function cleanupRateLimit(): void {
  rateLimitStore.clearAll()
}