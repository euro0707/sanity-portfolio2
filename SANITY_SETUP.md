# Sanity CMS Setup Guide

This guide helps you set up Sanity CMS for content management in your Neo Portfolio 2.

## What is Sanity CMS?

Sanity is a headless CMS that provides:
- ✅ **Real-time Editing**: Live content updates
- ✅ **Rich Content**: Text, images, and structured data
- ✅ **Developer Friendly**: GraphQL and REST APIs
- ✅ **Collaborative**: Multi-user content management
- ✅ **Free Tier**: Great for personal portfolios

## Quick Setup (Recommended)

### Option 1: Use Mock Data (No Setup Required)

Your portfolio works out-of-the-box with mock data. If you want to get started quickly:

1. The portfolio automatically uses mock data when Sanity is not configured
2. All features work normally with sample projects
3. You can deploy to Vercel immediately

### Option 2: Full Sanity Setup

Follow this guide to set up your own Sanity CMS for custom content management.

## Step-by-Step Sanity Setup

### 1. Create Sanity Account

1. Go to [sanity.io](https://www.sanity.io/)
2. Click **"Get started for free"**
3. Sign up with GitHub, Google, or email
4. Complete account verification

### 2. Create New Project

#### Option A: Using Sanity CLI (Recommended)

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize new project
sanity init

# Follow the prompts:
# ✅ Create new project
# ✅ Project name: "Neo Portfolio" (or your preference)
# ✅ Use default dataset configuration? Yes
# ✅ Project output path: "./sanity-studio" (or your preference)
# ✅ Select schema template: Clean project with no predefined schemas
```

#### Option B: Using Sanity Dashboard

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create project"**
3. Enter project name: **"Neo Portfolio"**
4. Choose **"Production"** dataset
5. Select region (closest to your users)

### 3. Get Project Configuration

After creating your project, note these values:

```bash
# From CLI output or dashboard
Project ID: abc123def456  # Your unique project ID
Dataset: production       # Usually 'production'
```

### 4. Configure Environment Variables

Update your `.env.local` file:

```env
# Replace with your actual Sanity project ID
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def456
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Import Schema

If you used CLI and created a separate studio, copy the schema:

```bash
# Copy schema from this project to your Sanity studio
cp ./sanity/schema.ts ./sanity-studio/schemas/
```

Or if using the integrated setup, the schema is already configured.

### 6. Configure CORS (Important!)

Allow your portfolio to access Sanity:

```bash
# Add CORS origin (replace with your domain)
sanity cors add http://localhost:3000 --credentials

# For production, add your Vercel domain
sanity cors add https://your-domain.vercel.app --credentials
```

Or via dashboard:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API**
4. Add CORS origins:
   - `http://localhost:3000` (development)
   - `https://your-domain.vercel.app` (production)

### 7. Start Sanity Studio

```bash
# If using integrated setup (recommended)
npx sanity dev

# If using separate studio directory
cd sanity-studio
npm run dev
```

Studio will be available at: http://localhost:3333

### 8. Add Content

1. Open Sanity Studio in your browser
2. Click **"Create"** → **"Project"**
3. Fill in project details:
   - **Title**: Your project name
   - **Slug**: Auto-generated URL slug
   - **Description**: Brief description
   - **GitHub URL**: Full GitHub repository URL
   - **Featured**: Check for homepage highlight
   - **Tags**: Technology tags (React, TypeScript, etc.)

### 9. Test Integration

1. Add at least one project in Sanity Studio
2. Restart your Next.js dev server:
   ```bash
   pnpm dev
   ```
3. Check your portfolio - it should now show Sanity content instead of mock data

## Schema Overview

Your portfolio uses this content structure:

### Project Document

```typescript
{
  title: string          // Project name
  slug: {                // URL-friendly identifier
    current: string
  }
  description?: string   // Brief description
  githubUrl: string      // GitHub repository URL
  featured: boolean      // Show on homepage
  tags: string[]         // Technology tags
  _createdAt: string     // Auto-generated
  _updatedAt: string     // Auto-generated
}
```

### Field Validations

- **Title**: 3-80 characters, required
- **Slug**: Auto-generated from title, required
- **Description**: Max 300 characters, optional
- **GitHub URL**: Must be valid HTTPS GitHub URL, required
- **Tags**: Max 10 tags, optional
- **Featured**: Boolean, defaults to false

## Content Guidelines

### Writing Good Descriptions

- Keep under 300 characters
- Focus on key features and technologies
- Use active voice
- Mention the problem solved

### Choosing Tags

Recommended tags for a developer portfolio:
```
Frontend: React, Vue, Angular, TypeScript, JavaScript
Backend: Node.js, Python, Java, Go, PHP
Database: PostgreSQL, MongoDB, Redis, Firebase
Cloud: AWS, Vercel, Netlify, Docker
Tools: Git, Webpack, Vite, Jest
```

### GitHub URLs

- Use complete repository URLs: `https://github.com/username/repo`
- Ensure repositories are public (unless you have GitHub token)
- Repository should have a good README

## Advanced Configuration

### Custom Schemas

To add more content types, edit `sanity/schema.ts`:

```typescript
// Example: Add a blog post schema
export const blogSchema = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Add your fields here
  ]
})

export const schemaTypes = [projectSchema, blogSchema]
```

### Studio Customization

Customize the studio experience in `sanity.config.ts`:

```typescript
export default defineConfig({
  // ... existing config
  
  // Custom studio title
  title: 'My Portfolio CMS',
  
  // Custom theme
  theme: 'minimal',
  
  // Additional plugins
  plugins: [
    deskTool({
      // Custom structure
    }),
    visionTool(),
    // Add more plugins
  ],
})
```

## Troubleshooting

### Common Issues

#### 1. "Project ID not found"
```bash
# Check your .env.local file
cat .env.local

# Verify project ID is correct
sanity projects list
```

#### 2. "CORS origin not allowed"
```bash
# Add CORS origin
sanity cors add http://localhost:3000

# List current CORS settings
sanity cors list
```

#### 3. "Authentication failed"
```bash
# Re-login to Sanity
sanity logout
sanity login
```

#### 4. No content showing in portfolio
1. Verify environment variables are set
2. Check Sanity Studio has content
3. Restart development server
4. Check browser console for errors

### Debug Steps

1. **Check Connection**:
   ```bash
   # Test Sanity connection
   npx sanity exec --with-user-token scripts/test-connection.js
   ```

2. **Verify Environment**:
   ```javascript
   // Add to any page temporarily
   console.log({
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
   })
   ```

3. **Check CORS**:
   ```bash
   # List all CORS origins
   sanity cors list
   ```

## Deployment Considerations

### Production Settings

1. **Environment Variables**: Set in Vercel dashboard
2. **CORS Origins**: Add production domain
3. **Dataset**: Use 'production' for live data
4. **API Version**: Keep consistent across environments

### Content Strategy

1. **Test Content**: Use development dataset for testing
2. **Staging**: Consider separate staging project
3. **Backups**: Sanity provides automatic backups
4. **Collaboration**: Invite team members to Sanity project

## Cost Considerations

### Sanity Pricing (as of 2024)

- **Free Tier**: 
  - 3 users
  - 10,000 API requests/month
  - 500MB storage
  - Perfect for personal portfolios

- **Growth Plan**: $99/month
  - Unlimited users
  - 500,000 API requests/month
  - Needed for high-traffic sites

### Optimization Tips

- Use CDN for images
- Cache API responses
- Use ISR for static generation
- Monitor API usage in dashboard

## Next Steps

After setting up Sanity:

1. ✅ **Add Your Projects**: Import your real project data
2. ✅ **Customize Content**: Expand schemas as needed
3. ✅ **Deploy**: Use DEPLOYMENT.md guide
4. ✅ **Monitor**: Track content performance

---

**Need Help?**

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://slack.sanity.io/)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/nextjs)
- Create an issue in this repository