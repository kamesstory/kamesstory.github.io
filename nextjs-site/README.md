# Jason Wang - Personal Website (Next.js)

A modern, professional personal website built with Next.js, featuring dynamic content sections with scrambling text animations.

## Features

- **Modern Stack**: Next.js 16 with App Router, TypeScript, and Tailwind CSS
- **Warm Techno-Futurist Theme**: Light, optimistic color scheme with warm tones
- **Clean Typography**: Inter font for a modern, readable experience
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
    ├── specialities/       # Speciality markdown files
    └── thoughts/           # Thought/blog markdown files
```

## Content Sections

The landing page features three dynamic sections that randomly display content:

1. **A Thing I've Worked On** - Projects (CalderaJS, Cohere, AbbyCare, etc.)
2. **A Thing I Love Doing** - Specialities (U-Haul driving, hosting tea, jazz, etc.)
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

# Add a new speciality
touch content/specialities/my-new-speciality.md

# Add a new thought
touch content/thoughts/my-new-thought.md
```

Each file should include frontmatter with a title and the content body.

## Design System

**Colors (Digital Optimism - Techno-Futurist Builder)**:

- Background: `#f7f9fc` (cool digital white with blue tint)
- Foreground: `#1a1f36` (deep navy)
- Accent: `#0066ff` (bright electric blue)
- Secondary: `#00d4ff` (cyber cyan)
- Tertiary: `#7c3aed` (vibrant purple)
- Warning: `#ff9500` (electric orange)

**Typography**:

- Headings: Inter (modern sans-serif)
- Body: Inter (modern sans-serif)
- Base size: 16px

## Future Enhancements

- Implement actual routing for section links (`/projects` as well as `/writing`). Each specific item within my randomized lists should link to something longer form, because the truth is I view a lot of these randomized things as important parts of myself.
- Add individual content pages
- Implement content filtering and search
- Add transitions between random content selections
