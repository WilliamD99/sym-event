# SponsorSlider Slice

A responsive slider component that showcases sponsor organizations with smooth navigation and auto-advance functionality.

## Features

- **Editable Content**: Title, description, and call-to-action button
- **Dynamic Sponsors**: Each slide item links to a sponsor document type
- **Interactive Navigation**: Previous/next arrows and dot indicators
- **Auto-advance**: Automatically cycles through sponsors every 5 seconds
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: ARIA labels and keyboard navigation support

## Content Fields

### Primary Fields
- **Title**: Structured text field supporting headings (h1, h2, h3)
- **Description**: Rich text field for slider description
- **Button Text**: Text for the call-to-action button
- **Button Link**: URL or internal link for the CTA button

### Repeatable Items
- **Sponsor**: Content relationship field linking to sponsor documents

## Sponsor Document Structure

Each sponsor item displays:
- Logo image
- Title/name
- Description (truncated to 3 lines)
- Website link with external icon

## Usage

1. Add the SponsorSlider slice to your page or document
2. Fill in the title and description
3. Add sponsor documents to the repeatable zone
4. Configure the call-to-action button (optional)

## Styling

The component uses Tailwind CSS classes and includes:
- Smooth transitions and hover effects
- Card-based design with shadows
- Responsive spacing and typography
- Brand-consistent color scheme

## Technical Notes

- Uses React hooks for state management
- Client-side component with "use client" directive
- Handles loading states and error cases
- Optimized images with Prismic Next.js integration 