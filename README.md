# Neo Portfolio 2 - Modern Developer Portfolio

A cutting-edge portfolio built with Next.js, Sanity CMS, and Tailwind CSS featuring real-time GitHub integration and a stunning dark neon theme.

## ✨ Features

- 🚀 **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- 🎨 **Dark Neon Theme**: High-contrast WCAG AAA compliant design
- 📱 **Fully Responsive**: Mobile-first design with smooth animations
- 🔒 **Security First**: CSP headers, rate limiting, secret scanning
- 📊 **GitHub Integration**: Real-time repository data via GitHub API
- 🎯 **CMS Powered**: Content management with Sanity Studio
- ⚡ **Performance Optimized**: ISR, image optimization, bundle analysis

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Sanity.io
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Sanity account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 20250821sanity-portfolio2
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GITHUB_TOKEN=your_github_token_optional
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Sanity Studio Setup

1. **Create a new Sanity project**

   ```bash
   npx sanity@latest init
   ```

2. **Configure the project**
   - Use the project ID in your `.env.local`
   - Import the schema from `sanity/schema.ts`

3. **Access Sanity Studio**
   ```bash
   npx sanity dev
   ```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── github/        # GitHub API integration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Hero.tsx          # Hero section
│   ├── ProjectCard.tsx   # Project card component
│   └── ProjectGrid.tsx   # Projects grid
├── lib/                   # Utility libraries
│   ├── env.ts            # Environment validation
│   ├── rateLimit.ts      # Rate limiting system
│   ├── sanity.ts         # Sanity client & queries
│   └── utils.ts          # Helper functions
├── sanity/               # Sanity configuration
│   └── schema.ts         # Content schemas
└── .env.example          # Environment template
```

## 🎨 Design System

### Colors

- **Background**: `#0b0f14` (Dark navy)
- **Cards**: `#0f1620` (Darker blue)
- **Text**: `#e6edf3` (Light gray)
- **Accent**: `#6ee7ff` (Neon cyan)
- **Secondary**: `#a78bfa` (Neon purple)

### Typography

- **Font**: Inter (primary), JetBrains Mono (code)
- **Scale**: 12px, 14px, 15px, 18px, 24px, 30px, 36px
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)

### Spacing

- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px
- **Grid**: 8px base unit

## 🔒 Security Features

- **Content Security Policy**: Strict CSP headers
- **Rate Limiting**: API protection with TTL cache
- **Secret Scanning**: Gitleaks integration
- **Environment Validation**: Zod schema validation
- **HTTPS**: Force secure connections

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on push

### Environment Variables for Production

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
GITHUB_TOKEN=your_github_token
```

## 📝 Content Management

### Adding Projects

1. Open Sanity Studio (`npx sanity dev`)
2. Navigate to Projects
3. Create new project with:
   - Title
   - Slug (auto-generated)
   - Description
   - GitHub URL
   - Tags
   - Featured status

### Project Schema

```typescript
{
  title: string        // Project name
  slug: slug          // URL slug
  description: text   // Project description
  githubUrl: url      // GitHub repository URL
  featured: boolean   // Featured on homepage
  tags: string[]      // Technology tags
}
```

## 🔧 Development

### Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript check
```

### Git Hooks

- **pre-commit**: Runs ESLint, Prettier, Gitleaks, and TypeScript check
- **Security scanning**: Automatic secret detection

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for best user experience
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **ISR**: Incremental Static Regeneration for dynamic content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Sanity](https://www.sanity.io/) - Content management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment platform
