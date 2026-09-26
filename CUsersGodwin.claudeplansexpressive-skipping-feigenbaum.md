# Floating Section Title Sidebar - Implementation Plan

## Context
The user wants to add a floating sidebar/badge on the right side of each section that displays the section title. This badge should:
- Appear with an animation when the section enters the viewport
- Disappear after 3 seconds (or when section leaves viewport)
- Reappear when the cursor hovers near it from the right
- Use theme-dependent colors (background and text)
- Show only the section title (not description)
- Have a mobile-friendly version

## Files to Create/Modify

### New Components
1. **`src/components/ui/SectionBadge.tsx`** - Reusable badge component
2. **`src/components/ui/SectionBadge.css`** - Badge styles

### Modified Sections (add badge)
1. `src/components/sections/VideoPresentation.tsx`
2. `src/components/sections/ProjectsClient.tsx`
3. `src/components/sections/ServicesClient.tsx`
4. `src/components/sections/TestimonialsClient.tsx`
5. `src/components/sections/StatsClient.tsx`
6. `src/components/sections/CallToAction.tsx`

### CSS Updates
1. `src/app/globals.css` - Add theme variables for badge

## Implementation Details

### SectionBadge Component
- Props: `title`, `sectionId`
- Uses `useInView` to detect visibility
- Uses CSS `:hover` for cursor interaction
- Mobile: fixed bottom position instead of right sidebar
- Colors use CSS custom properties for theming

### Animation Behavior
- Entry: Slide in from right with fade (0.4s ease-out)
- Exit: Slide out to right after 3s or when not in view
- Hover: Slide back in when cursor approaches from right
- Uses `position: fixed` for right sidebar positioning

### Mobile Version
- Position: Fixed at bottom center
- Width: 90% max-width
- Z-index: Higher than content
