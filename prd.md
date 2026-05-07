# PRD — Artist Portfolio Website

## Product Overview

A cinematic portfolio website for a Nigerian-born music producer, DJ, and songwriter based in the UK. The platform serves as a digital identity showcasing music, visuals, creative storytelling, and artistic direction through a premium editorial-style experience.

The website should feel atmospheric, immersive, visually refined, and culturally rich while remaining fast, modern, and mobile-first.

---

# Product Goals

- Establish a strong online artistic identity
- Showcase music and visuals professionally
- Increase bookings and collaboration opportunities
- Deliver a memorable cinematic experience
- Create a scalable foundation for future releases and creative growth

---

# Target Users

## Primary Users
- Fans and listeners
- Event promoters and organisers
- Record labels and A&Rs
- Artists and collaborators
- Creative industry professionals

## User Intent
- Discover music
- Explore visuals
- Understand the artist identity
- Access streaming platforms
- Contact for bookings and collaborations

---

# Website Structure

```txt
/
├── Home
├── Bio
├── Photos
├── Music
└── Contact
```

---

# Core Features (V1)

## 1. Homepage

### Purpose
Create a strong emotional first impression and introduce the artist identity.

### Sections
- Cinematic hero section
- Artist introduction
- Background video/image
- Featured release
- Featured gallery preview
- Contact CTA

### Functional Requirements
- Responsive hero layout
- Smooth scroll animations
- Autoplay muted hero video
- Mobile-optimised media
- CTA buttons for music and contact

---

## 2. Bio Page

### Purpose
Tell the artist story and creative background.

### Sections
- Artist biography
- Creative philosophy
- Nigerian roots and UK influence
- Career highlights

### Functional Requirements
- CMS editable content
- Editorial layout
- Rich text support
- Responsive typography

---

## 3. Photos Page

### Purpose
Showcase visual identity through curated imagery.

### Sections
- Gallery hero
- Masonry/grid gallery
- Fullscreen image preview

### Functional Requirements
- Lazy-loaded images
- Responsive gallery layout
- Fullscreen modal support
- Keyboard accessibility

---

## 4. Music Page

### Purpose
Central hub for releases, mixes, and streaming.

### Sections
- Featured releases
- DJ mixes
- Embedded players
- Streaming links

### Functional Requirements
- Spotify embeds
- SoundCloud embeds
- Cover artworks
- CMS-managed releases
- External links open in new tab

---

## 5. Contact Page

### Purpose
Enable bookings and collaboration inquiries.

### Sections
- Contact form
- Social links
- Business email
- Booking CTA

### Functional Requirements
- Form validation
- Spam protection
- Mobile-friendly layout
- Success/error states

---

# System Architecture

## Navigation System
- Sticky navigation
- Mobile hamburger menu
- Active page states
- Smooth transitions
- Framer Motion animations

---

## CMS System

### CMS Platform
Sanity CMS

### Collections

#### Site Settings
```ts
siteSettings = {
  artistName: string,
  tagline: string,
  email: string,
  instagramUrl?: string,
  spotifyUrl?: string,
  soundcloudUrl?: string,
  youtubeUrl?: string
}
```

#### Music Release
```ts
musicRelease = {
  title: string,
  slug: slug,
  releaseType: string,
  coverImage: image,
  releaseDate: date,
  description?: text,
  featured: boolean,
  links: {
    spotify?: url,
    appleMusic?: url,
    soundcloud?: url,
    youtube?: url
  }
}
```

#### Gallery Image
```ts
galleryImage = {
  title?: string,
  image: image,
  alt: string,
  category: string,
  featured: boolean
}
```

---

# Technical Architecture

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## CMS
- Sanity CMS

## Hosting
- Vercel

## Forms
- Resend or Formspree

## Validation
- Zod
- React Hook Form

---

# Folder Structure

```txt
/src
├── app
│   ├── page.tsx
│   ├── bio/page.tsx
│   ├── photos/page.tsx
│   ├── music/page.tsx
│   ├── contact/page.tsx
│   └── layout.tsx
│
├── components
│   ├── global
│   ├── sections
│   ├── gallery
│   ├── music
│   └── forms
│
├── lib
│   ├── sanity.ts
│   ├── queries.ts
│   └── utils.ts
│
├── styles
│   └── globals.css
│
└── types
    └── index.ts
```

---

# Design System

## Visual Direction
- Dark cinematic aesthetic
- Editorial-inspired layouts
- Large typography
- Atmospheric visuals
- Minimal interface
- Fashion and nightlife influence

## Colour Palette
```txt
Background: Deep black / charcoal
Primary text: Off-white
Secondary text: Muted grey
Accent: Gold / electric blue / deep purple
```

## Motion Principles
- Slow and cinematic
- Smooth transitions
- Subtle hover interactions
- Minimal but premium feel

---

# SEO Requirements

- Dynamic metadata
- Open Graph tags
- Twitter cards
- robots.txt
- sitemap.xml
- Semantic HTML structure

---

# Performance Requirements

## Lighthouse Targets
- Performance: 90+
- Accessibility: 90+
- SEO: 90+

## Optimisation
- Lazy loading
- Image compression
- Optimised fonts
- Minimal JS bundle
- Deferred embeds

---

# Accessibility Requirements

- Semantic HTML
- Alt text for images
- Keyboard navigation support
- Accessible form labels
- Visible focus states
- Colour contrast compliance

---

# Out of Scope

- User authentication
- E-commerce
- Ticket sales
- Blog/news platform
- Community features
- Music upload dashboard
- Native mobile app
- Multi-language support

---

# Definition of Done

The product is complete when:

- All 5 pages are fully responsive
- Navigation works correctly across devices
- CMS content updates function properly
- Music embeds work correctly
- Gallery images load efficiently
- Contact form submissions work successfully
- SEO metadata is implemented
- Animations are smooth and performant
- Lighthouse targets are achieved
- Website is successfully deployed on Vercel
- Final experience feels immersive, premium, and visually cohesive
