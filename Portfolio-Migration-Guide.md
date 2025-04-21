# Portfolio Website Migration: From Static HTML to Next.js

This document details the process of migrating a simple static HTML/CSS website to a modern Next.js application deployed on GitHub Pages.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Initial Setup](#initial-setup)
3. [Technology Stack](#technology-stack)
4. [GitHub Pages Configuration](#github-pages-configuration)
5. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
6. [Development Workflow](#development-workflow)
7. [Design Decisions](#design-decisions)
8. [Future Enhancements](#future-enhancements)

## Project Overview

This project involved migrating a basic HTML/CSS portfolio website to a modern, component-based Next.js application with responsive design and dark mode support. The application is hosted on GitHub Pages with a custom domain.

### Goals

- Improve maintainability with a component-based architecture
- Add responsive design for all device sizes
- Implement dark/light theme support
- Create a more professional and modern user experience
- Simplify deployment through GitHub Actions

## Initial Setup

### Creating a Next.js Project

To create a new Next.js project, we used the following command:

```bash
npx create-next-app@latest my-portfolio
```

During the setup, we selected:
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- App Router (the latest Next.js routing system)
- Import aliases for cleaner imports

### File Structure

The Next.js application has the following structure:

```
my-portfolio/
├── .github/             # GitHub Actions workflow files
├── public/              # Static assets (images, CV, etc.)
├── src/                 # Source code
│   ├── app/             # App Router pages and layouts
│   │   ├── about/       # About page
│   │   ├── blog/        # Blog page
│   │   ├── contact/     # Contact page
│   │   ├── projects/    # Projects page
│   │   ├── globals.css  # Global CSS
│   │   ├── layout.tsx   # Root layout (shared across all pages)
│   │   └── page.tsx     # Home page
│   └── components/      # Reusable UI components
│       ├── header.tsx   # Site header/navigation
│       ├── footer.tsx   # Site footer
│       └── theme-provider.tsx # Theme context provider
├── .gitignore           # Git ignore file
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Technology Stack

### Core Technologies

- **Next.js 15** - React framework with server-side rendering and static site generation
- **React 19** - UI library for building component-based interfaces
- **TypeScript** - Static typing for JavaScript to improve developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Additional Libraries

- **next-themes** - Theme management for Next.js (dark/light mode)
- **framer-motion** - Animation library for React
- **react-icons** - Icon library with popular icon sets

## GitHub Pages Configuration

### Next.js Configuration

To prepare Next.js for static site generation (required for GitHub Pages), we modified `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Generate static files for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
};

export default nextConfig;
```

### GitHub Actions Workflow

We created a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automate the deployment process:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Node.js 🔧
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies 📦
        run: npm ci

      - name: Build 🔨
        run: npm run build

      - name: Prepare for deployment 📄
        run: |
          touch out/.nojekyll
          cp README.md out/
          cp CNAME out/  # Ensures the custom domain setting persists

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out 
          clean: true  # Automatically remove deleted files from the deploy branch
```

### Custom Domain Setup

A custom domain was configured for the GitHub Pages site:

1. Created a `CNAME` file in the repository root with the domain name (darrenseet.com)
2. Configured DNS settings with the domain provider to point to GitHub Pages
3. Added logic in the workflow to copy the CNAME file to the output directory

### Disabling Jekyll Processing

GitHub Pages uses Jekyll by default, which can interfere with Next.js sites. To disable Jekyll:

1. Created a `.nojekyll` file in the repository root
2. Added a step in the GitHub Actions workflow to create this file in the output directory

## Common Issues and Troubleshooting

### Issue: Old Site Files Interfering

The old static site files (index.html, style.css) were still in the repository root, causing GitHub Pages to serve them instead of the Next.js build. Solution:

```bash
# Delete the old files
git rm index.html style.css image.html
git commit -m "Remove old site files"
git push origin master
```

### Issue: React Linting Errors

Encountered a React linting error with unescaped apostrophes:

```
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
```

Fixed by changing `I'm` to `I&apos;m` in the page content.

### Issue: Build Failures

Encountered build failures due to complex components. Troubleshooting approach:

1. Simplify components by removing animations and complexity
2. Test builds locally before pushing to GitHub
3. Add components back gradually to identify issues
4. Ensure all imports are correct and components exist

### Issue: Cache Problems

GitHub Pages and browsers cache content, making it difficult to see updates. Solutions:

1. Added cache-control meta tags to the HTML head:
   ```html
   <meta httpEquiv="cache-control" content="no-cache" />
   <meta httpEquiv="expires" content="0" />
   <meta httpEquiv="pragma" content="no-cache" />
   ```
2. Used query parameters to bust the cache when testing
3. Cleared browser cache and tested in incognito/private windows

## Development Workflow

### Local Development

For local development, we use:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run start
```

### Deployment Process

The deployment process is automated through GitHub Actions:

1. Make changes to the codebase
2. Commit and push to the master branch
3. GitHub Actions automatically:
   - Builds the Next.js application
   - Generates static files
   - Deploys to GitHub Pages

## Design Decisions

### Component Architecture

We organized the site into reusable components to improve maintainability:

- **Header Component**: Navigation and theme toggle
- **Footer Component**: Site information and links
- **ThemeProvider**: Context for dark/light mode
- **Page Components**: Specific content for each page

### Styling Approach

We chose Tailwind CSS for several reasons:

- **Utility-First**: Faster development with pre-defined utility classes
- **Responsive Design**: Built-in responsive breakpoints (sm, md, lg, xl)
- **Dark Mode Support**: Easy implementation of dark/light themes
- **Performance**: Small bundle size with only the styles that are used

### Animations

We added subtle animations to improve user experience:

- Fade-in animations for content sections
- Hover effects for interactive elements
- Smooth transitions for dark/light mode toggle

### Accessibility

Several accessibility features were implemented:

- Semantic HTML structure
- ARIA labels for interactive elements
- Sufficient color contrast
- Responsive design for all device sizes

## Future Enhancements

Potential future improvements:

1. **Blog Integration**: Add a Markdown-based blog system
2. **Project Portfolio**: Create detailed project pages
3. **Contact Form**: Add a functional contact form with validation
4. **Analytics**: Integrate website analytics
5. **Performance Optimization**: Further optimize images and JavaScript
6. **Animation Improvements**: Enhance page transitions and animations

---

This documentation was generated on April 21, 2024, and reflects the current state of the portfolio website project. 