import { randomBytes } from 'crypto'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Generate nonce for inline styles
    const nonce = randomBytes(16).toString('base64')
    
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval'", // unsafe-eval needed for Next.js dev mode
      `style-src 'self' 'nonce-${nonce}'`,
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.github.com https://*.sanity.io",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join("; ")

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload"
          }
        ],
      },
    ]
  },
  
  // Optimize performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@sanity/ui', 'lucide-react']
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig