# AI Engineer Portfolio

A modern, responsive portfolio website showcasing AI and machine learning expertise. Built with React, TypeScript, and Framer Motion for smooth animations.

## Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Elements**: Magnetic pull effects, smooth transitions, and scroll animations
- **Project Showcase**: Detailed project cards with technology stacks
- **Skills Display**: Animated skill badges with hover effects
- **Contact Integration**: Direct links to GitHub, LinkedIn, and email

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-engineer-portf-motion
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── assets/             # Images and static assets
└── lib/                # Utility functions
```

## Customization

### Adding Projects
Edit the `projects` array in `src/pages/Index.tsx` to add or modify your projects.

### Updating Skills
Modify the `skills` array in `src/pages/Index.tsx` to showcase your technical skills.

### Styling
The project uses Tailwind CSS for styling. Customize colors and themes in `tailwind.config.ts`.

## Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## License

This project is open source and available under the [MIT License](LICENSE).