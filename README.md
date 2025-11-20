# Portfolio Website

A modern, premium portfolio website built with Next.js, featuring smooth animations, responsive design, and a clean, agency-level aesthetic.

## Features

- **Modern Design**: Clean, minimal interface with premium aesthetics
- **Smooth Animations**: Scroll-triggered animations using Framer Motion
- **Snap Scroll**: Section-based snap scrolling for better UX
- **Responsive**: Fully responsive design for all devices
- **Contact Form**: Integrated contact form using Formspree
- **Performance Optimized**: Built with Next.js for optimal performance

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **UI Components**: ShadCN UI
- **Form Handling**: Formspree

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── About/              # About section
│   ├── Contact/            # Contact section with form
│   ├── Header/             # Navigation header
│   ├── Hero/               # Hero section
│   ├── ProjectShowcase/    # Individual project showcase
│   ├── ProjectsShowcase/   # Projects container
│   └── ui/                 # UI components (ShadCN)
├── hooks/                  # Custom React hooks
│   ├── useHeader.ts        # Header navigation logic
│   └── useProjects.ts      # Projects data
└── lib/                    # Utility functions
    └── utils.ts            # Helper functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Contact Form

The contact form uses Formspree. To configure:

1. Create an account at [Formspree](https://formspree.io)
2. Create a new form and get your form endpoint
3. Update the endpoint in `src/components/Contact/useContact.ts`:
```typescript
const response = await fetch("YOUR_FORMSPREE_ENDPOINT", {
  // ...
});
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Architecture

### Component Structure

Each major component follows a pattern where:
- **Component file** (`.tsx`): Contains only UI/rendering logic
- **Hook file** (`.ts`): Contains all business logic, state management, and data fetching

This separation ensures:
- Clean, maintainable code
- Easy testing
- Reusable logic

### Custom Hooks

- `useHeader`: Manages header scroll state and navigation
- `useHero`: Provides hero section data and scroll functionality
- `useAbout`: Manages about section data, animations, and scroll
- `useContact`: Handles contact form state and submission
- `useProjectShowcase`: Manages project showcase animations
- `useProjects`: Provides project data

## Styling

The project uses Tailwind CSS with custom configuration. Key features:

- Dark/light theme support (via CSS variables)
- Custom gradient utilities
- Responsive breakpoints
- Custom animations

## Deployment

The project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables if needed
4. Deploy

## License

MIT
