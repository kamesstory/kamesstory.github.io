# Jason Wang - Personal Website (Next.js)

A modern, professional personal website built with Next.js, featuring dynamic content sections with scrambling text animations.

## Features

- **Modern Stack**: Next.js 16 with App Router, TypeScript, and Tailwind CSS
- **Monokai Pro Theme**: Dark mode color scheme throughout
- **Terminal-Style Fonts**: IBM Plex Mono for headings, Inter for body text
- **Dynamic Content**: Three rotating sections that randomly display content from markdown files
- **Scrambling Animation**: Text animations using the `use-scramble` library
- **Responsive Design**: Mobile-friendly layout with 50% column width on desktop

## Project Structure

```
nextjs-site/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles with Monokai Pro colors
├── components/
│   └── ContentSection.tsx  # Reusable section component with scrambling effect
├── lib/
│   └── content.ts          # Content loading utilities
└── content/
    ├── projects/           # Project markdown files
    ├── activities/         # Activity markdown files
    └── thoughts/           # Thought/blog markdown files
```

## Content Sections

The landing page features three dynamic sections that randomly display content:

1. **A Thing I've Built** - Projects (CalderaJS, Cohere, AbbyCare, etc.)
2. **A Thing I Do** - Activities (U-Haul driving, hosting tea, jazz, etc.)
3. **A Thought I've Had** - Thoughts and blog entries

Content is stored as markdown files in the `content/` directory with frontmatter:

```markdown
---
title: Your Title Here
---

Your content here.
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server runs on [http://localhost:3000](http://localhost:3000).

## Deployment

This site is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Adding New Content

To add new content to any section, simply create a new markdown file in the appropriate directory:

```bash
# Add a new project
touch content/projects/my-new-project.md

# Add a new activity
touch content/activities/my-new-activity.md

# Add a new thought
touch content/thoughts/my-new-thought.md
```

Each file should include frontmatter with a title and the content body.

## Design System

**Colors (Monokai Pro)**:

- Background: `#2d2a2e`
- Foreground: `#fcfcfa`
- Accent: `#ffd866`
- Secondary: `#ff6188`
- Info/Links: `#78dce8`

**Typography**:

- Headings: IBM Plex Mono (terminal-style)
- Body: Inter (modern sans-serif)
- Base size: 14px

## Future Enhancements

- Implement actual routing for section links (`/projects`, `/activities`, `/thoughts`)
- Add individual content pages
- Implement content filtering and search
- Add transitions between random content selections
