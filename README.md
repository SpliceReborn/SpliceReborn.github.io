# Darren Seet - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS, deployed on GitHub Pages.

![Website Screenshot](public/images/rightimage.jpg)

## 🚀 Features

- ✨ Modern, responsive design for all device sizes
- 🌙 Dark/light mode toggle with system preference detection
- 🎨 Smooth animations and transitions using Framer Motion
- 📱 Mobile-friendly navigation with hamburger menu
- 📝 Blog section with category filtering
- 💼 Projects showcase with search and filtering
- 📧 Contact form with validation
- 🚀 Automated deployment via GitHub Actions

## 🧰 Technology Stack

### Core Technologies

- **Next.js 15** - React framework with server-side rendering and static site generation
- **React 19** - UI library for building component-based interfaces
- **TypeScript** - Static typing for JavaScript to improve developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Additional Libraries

- **next-themes** - Theme management for Next.js (dark/light mode)
- **framer-motion** - Animation library for React
- **react-icons** - Icon library with popular icon sets

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/SpliceReborn/SpliceReborn.github.io.git
cd SpliceReborn.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
.
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
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🚢 Deployment

This site is deployed on GitHub Pages using GitHub Actions. The deployment process is triggered automatically when pushing to the master branch:

1. GitHub Actions checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Builds the static site with Next.js export
5. Creates a `.nojekyll` file to bypass Jekyll processing
6. Deploys the build output to the GitHub Pages

You can also deploy manually with:

```bash
npm run deploy
```

The site is accessible at:
- GitHub Pages: https://splicereborn.github.io/
- Custom Domain: https://darrenseet.com/

## 🔍 Common Issues & Troubleshooting

- **Content not updating on GitHub Pages**: Add cache control meta tags in the HTML head, and hard refresh browsers with Ctrl+F5 (or Cmd+Shift+R on Mac)
- **React component errors**: Make sure to use proper JSX formatting and escape apostrophes with `&apos;`
- **Build failures**: Test builds locally before pushing with `npm run build` to catch errors early

## 📝 Future Enhancements

- Add a Markdown-based blog system with MDX
- Create detailed project case studies
- Implement a functional contact form with server-side handling
- Add analytics for visitor tracking
- Further optimize loading performance

## 📄 License

[MIT](LICENSE)
