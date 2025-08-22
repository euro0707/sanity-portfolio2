# Deployment Guide

This guide covers deployment setup for the Neo Portfolio 2 project.

## Vercel Deployment

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Sanity Project**: Set up Sanity CMS (optional but recommended)
4. **GitHub Token**: For enhanced API limits (optional)

### Step 1: Environment Variables

Set up the following environment variables in Vercel dashboard:

#### Required
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.vercel.app
```

#### Optional (Recommended)
```env
GITHUB_TOKEN=your_github_personal_access_token
```

### Step 2: Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install` 
- **Framework**: Next.js
- **Region**: Tokyo (hnd1) for better performance in Asia
- **Security Headers**: CSP, XSS Protection, Frame Options
- **Function Timeout**: 10s for GitHub API calls

### Step 3: Deploy

1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all required variables listed above

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## GitHub Token Setup

### Why GitHub Token?

- **Rate Limit**: 60 requests/hour → 5,000 requests/hour
- **Private Repos**: Access private repositories
- **Better Performance**: Faster API responses

### Creating a GitHub Token

1. **Go to GitHub Settings**
   - GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click "Generate new token (classic)"
   - Name: "Portfolio API Token"
   - Expiration: 90 days (or your preference)

3. **Select Scopes**
   ```
   ✅ public_repo        # Access public repositories
   ✅ read:user          # Read user profile
   ✅ user:email         # Read user email
   ```

4. **Copy Token**
   - **IMPORTANT**: Copy the token immediately
   - Store securely (you won't see it again)

5. **Add to Vercel**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Add: `GITHUB_TOKEN` = `your_token_here`

### Verifying Token

Test your token:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user
```

## Sanity CMS Setup

### Creating Sanity Project

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Create new project
sanity init
# Choose: Create new project
# Choose: Blog schema template
# Choose: Yes to TypeScript
```

### Configuration

1. **Get Project ID**
   ```bash
   sanity projects list
   ```

2. **Add to Environment Variables**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Configure CORS (for production)**
   ```bash
   sanity cors add https://yourdomain.vercel.app
   ```

### Schema Import

Copy the schema from `sanity/schema.ts` to your Sanity Studio.

## Performance Optimization

### Vercel Settings

- **Edge Functions**: Enabled for faster response times
- **Image Optimization**: Automatic with Next.js
- **Caching**: CDN caching with revalidation
- **Compression**: Gzip/Brotli enabled

### Performance Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Core Web Vitals**: Monitor in dashboard
3. **Function Logs**: Check for errors

## Security Configuration

### Headers

The deployment includes security headers:

- **CSP**: Content Security Policy for XSS protection
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection

### Rate Limiting

GitHub API endpoints include rate limiting:
- 60 requests per hour per IP
- Automatic caching for performance
- Error handling for rate limit exceeded

## Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check TypeScript errors
   pnpm type-check
   
   # Check ESLint errors  
   pnpm lint
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Redeploy after adding new variables

3. **GitHub API Rate Limit**
   - Add `GITHUB_TOKEN` environment variable
   - Check token permissions

4. **Sanity Not Loading**
   - Verify project ID and dataset name
   - Check CORS settings in Sanity dashboard

### Deployment Checklist

- [ ] Environment variables configured
- [ ] GitHub token added (optional)
- [ ] Sanity project set up (optional)
- [ ] Custom domain configured (optional)
- [ ] Security headers verified
- [ ] Performance metrics checked

## Monitoring

### Vercel Dashboard

Monitor your deployment:

- **Function Logs**: Real-time error tracking
- **Analytics**: Performance metrics
- **Deployments**: Build history and rollbacks

### GitHub Integration

- **Automatic Deployments**: On every push to main
- **Preview Deployments**: For pull requests
- **Rollback**: One-click rollback to previous versions

---

**Need Help?**

Check the Vercel documentation or create an issue in the repository.