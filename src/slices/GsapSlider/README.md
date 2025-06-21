# GSAP Slider Slice

A beautiful, animated slider component built with GSAP for smooth transitions and interactive effects.

## Features

- **Smooth GSAP Animations**: Uses GSAP for fluid slide transitions and mouse tilt effects
- **Mouse Interactivity**: Images respond to mouse movement with subtle tilt and rotation effects
- **Customizable Content**: Each slide supports title, description, CTA button, and background image
- **Responsive Design**: Fully responsive with mobile-optimized layouts
- **Navigation**: Clickable bullet navigation for easy slide control
- **Prismic Integration**: Fully integrated with Prismic CMS for content management

## Content Fields

Each slide in the slider supports the following fields:

- **Title** (Text): The main headline for the slide
- **Description** (Rich Text): Supporting text content with basic formatting
- **CTA Text** (Text): Call-to-action button text
- **CTA Link** (Link): URL for the call-to-action button
- **Background Image** (Image): Full-screen background image for the slide

## Usage

1. Add the GsapSlider slice to your Prismic document
2. Configure each slide with your content:
   - Add a compelling title
   - Write descriptive text
   - Set up your call-to-action
   - Upload a high-quality background image (recommended: 1920x1080px)
3. Publish your changes

## Technical Details

### GSAP Effects

- **Slide Transitions**: Smooth horizontal slide animations with blur effects
- **Mouse Tilt**: Interactive 3D tilt effect on background images
- **Navigation**: Fade-in/out effects for navigation elements

### Performance

- Lazy loading for images
- Optimized GSAP animations
- Client-side rendering for interactive elements

### Browser Support

- Modern browsers with CSS3 and ES6 support
- Mobile-optimized touch interactions
- Fallback styling for older browsers

## Customization

The component includes responsive breakpoints:
- **Desktop**: Full-size titles and descriptions
- **Tablet** (768px): Adjusted font sizes and spacing  
- **Mobile** (500px): Centered layout, hidden descriptions
- **Small Mobile** (450px): Further reduced font sizes

## Dependencies

- GSAP 3.13.0+
- Next.js 15+
- Prismic React components
- Tailwind CSS 