# GitHub API Token Setup Guide

This guide helps you set up a GitHub Personal Access Token for enhanced API performance in your portfolio.

## Why You Need a GitHub Token

### Without Token (Anonymous)
- ⚠️ **Rate Limit**: 60 requests per hour
- ❌ **Private Repos**: Cannot access private repositories
- 🐌 **Performance**: Slower response times

### With Token (Authenticated)
- ✅ **Rate Limit**: 5,000 requests per hour
- ✅ **Private Repos**: Access to your private repositories
- ⚡ **Performance**: Faster and more reliable API calls

## Step-by-Step Setup

### 1. Navigate to GitHub Settings

1. Go to [GitHub.com](https://github.com)
2. Click your profile picture (top-right)
3. Select **Settings**
4. In the left sidebar, click **Developer settings**
5. Click **Personal access tokens**
6. Select **Tokens (classic)**

### 2. Generate New Token

1. Click **"Generate new token (classic)"**
2. You may need to confirm your password

### 3. Configure Token Settings

Fill out the token form:

#### Basic Information
- **Note**: `Portfolio API Token` (or any descriptive name)
- **Expiration**: Choose your preference
  - `30 days` - More secure, requires renewal
  - `90 days` - Good balance
  - `No expiration` - Convenient but less secure

#### Required Scopes
Select these permissions:

```
✅ public_repo          # Access public repositories
✅ read:user            # Read user profile information  
✅ user:email           # Read user email addresses
```

#### Optional Scopes (if needed)
```
⬜ repo                 # Full control of private repositories
⬜ read:org             # Read organization data
```

### 4. Generate and Copy Token

1. Click **"Generate token"**
2. **IMPORTANT**: Copy the token immediately
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Store it securely (you won't see it again!)

### 5. Add Token to Your Project

#### For Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your token:
   ```env
   GITHUB_TOKEN=ghp_your_token_here
   ```

#### For Vercel Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add**:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: `ghp_your_token_here`
   - **Environment**: All (Production, Preview, Development)
5. Click **Save**

### 6. Verify Token Works

Test your token locally:

```bash
# Start the development server
pnpm dev

# Test the GitHub API endpoint
curl "http://localhost:3000/api/github?repo=microsoft/vscode"
```

You should see repository data without rate limit warnings.

## Security Best Practices

### ✅ Do's
- Store tokens in environment variables only
- Use minimal required permissions  
- Set expiration dates
- Regenerate tokens periodically
- Keep tokens private

### ❌ Don'ts
- Never commit tokens to git
- Don't share tokens in public
- Don't use tokens with excessive permissions
- Don't hardcode tokens in source code

## Troubleshooting

### Token Not Working

1. **Check Permissions**
   - Ensure `public_repo` scope is selected
   - Verify token hasn't expired

2. **Verify Environment Variables**
   ```bash
   # Check if token is loaded (should show masked value)
   echo $GITHUB_TOKEN
   ```

3. **Test Token Directly**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user
   ```

### Rate Limit Still Applied

1. **Check Token Format**
   - Should start with `ghp_`
   - Ensure no extra spaces or characters

2. **Restart Application**
   - Restart development server after adding token
   - Redeploy Vercel after adding environment variable

### API Errors

Common error responses:

```json
// Invalid token
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest"
}

// Token expired
{
  "message": "The token used in the Authorization header has expired."
}

// Insufficient permissions
{
  "message": "Not Found"
}
```

## Token Management

### Renewal Process

1. Before token expires, generate a new one
2. Update environment variables
3. Delete old token from GitHub

### Multiple Tokens

You can create multiple tokens for different purposes:
- `Portfolio Production` - For live site
- `Portfolio Development` - For local development
- `Portfolio Testing` - For testing

### Revoking Tokens

To revoke a token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Find your token
3. Click **Delete**

## Monitoring Usage

### GitHub API Limits

Check your current usage:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/rate_limit
```

Response shows:
```json
{
  "rate": {
    "limit": 5000,        // Requests per hour
    "remaining": 4999,    // Remaining requests
    "reset": 1640995200   // Reset timestamp
  }
}
```

### Portfolio Analytics

Your portfolio includes rate limit headers in API responses:
- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: When limit resets

## Next Steps

After setting up your GitHub token:

1. ✅ **Deploy to Vercel** - Use the DEPLOYMENT.md guide
2. ✅ **Test Portfolio** - Verify all GitHub integrations work
3. ✅ **Monitor Usage** - Check API limits in production

---

**Need Help?**

- [GitHub Token Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
- Create an issue in this repository