# Habit Tracking & Challenge Management Application - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Strava's achievement celebrations and Apple's Activity app calendar view for motivational design and clear progress visualization.

## Core Design Elements

### A. Typography
- **Font Families**: Poppins (headings, badges, CTAs) and Inter (body text, data)
- **Hierarchy**:
  - Hero/Welcome Titles: Poppins Bold, 3-4rem
  - Section Headers: Poppins SemiBold, 1.8-2rem
  - Card Titles: Poppins Medium, 1.3-1.5rem
  - Body Text: Inter Regular, 1rem
  - Calendar Days: Inter Medium, 0.9-1rem
  - Badge Text: Poppins SemiBold, 0.9-1rem
  - Motivational Quotes: Inter Italic, 1.1rem

### B. Color System
- **Primary**: #4CAF50 (Success Green) - Completed days, progress fills, success states
- **Secondary**: #FF5722 (Challenge Orange) - CTAs, reset warnings, streak indicators
- **Background**: #FAFAFA (Light Grey) - App background, card backgrounds
- **Text**: #212121 (Dark Grey) - Primary text color
- **Achievement**: #FFD700 (Gold) - Celebration badges, achievement highlights, completion states
- **Calendar**: #E3F2FD (Light Blue) - Calendar grid backgrounds, inactive day states

### C. Layout System
**Spacing Units**: Use Tailwind spacing of 4, 8, 12, 16, 20, 24, and 32 for consistent rhythm (p-4, m-8, gap-12, py-16, etc.)

**Container Strategy**:
- Max-width: 1200px for main content
- Mobile: Full width with px-4 padding
- Tablet/Desktop: Centered with auto margins

**Grid Layouts**:
- Dashboard Cards: 1-column mobile, 2-column tablet, 3-column desktop
- Calendar Grid: Fixed 7-column (days of week)
- Stats Section: 2-3 column responsive grid

### D. Component Library

**Welcome Flow**:
- Full-screen centered layout with app logo/icon
- Welcome title with gradient text treatment
- Challenge duration selection (21/45/90/180/365 day options) as large, tappable cards
- Prominent "Start Challenge" CTA button
- Motivational subtitle text

**Calendar View** (Primary Feature):
- Month header with navigation arrows
- 7-column grid for weekdays (Sun-Sat)
- Day cells showing:
  - Completed days: Primary green background with checkmark
  - Current day: Border highlight
  - Future days: Light grey/disabled state
  - Failed/broken days: Light orange indicator
- Calendar takes prominent space - larger cells on desktop, appropriately sized on mobile
- Show current month by default with previous/next month navigation

**Challenge Dashboard Cards**:
- Current Streak counter (large number + "days" label)
- Overall Progress bar (visual percentage fill)
- Days Remaining counter
- Completion Percentage stat
- Each card with icon, title, value, and subtle background

**Daily Check-In Section**:
- Large, centered "Mark Today Complete" button when pending
- Already completed state: Success message with checkmark
- Motivational quote display (rotates or static)
- Day counter badge (e.g., "Day 47 of 90")

**Reset Flow** (When Challenge Broken):
- Warning modal/screen explaining reset
- Required text area for motivational promise paragraph (minimum length enforced)
- Dual CTA: "Cancel" and "Reset Challenge" buttons
- Emphasis on commitment restart

**Achievement Celebration Screen**:
- Full-screen takeover when challenge completed
- Large gold trophy/badge graphic
- Completion message with final stats
- Confetti or celebration animation (subtle, tasteful)
- Two options: "Start New Challenge" or "Extend Challenge"
- Share achievement option

**Navigation**:
- Simple top bar with app name/logo
- Optional user profile indicator (avatar or initials)
- Hamburger menu for mobile with minimal options

**Badges & Progress Indicators**:
- Circular progress rings for percentage completion
- Linear progress bars with gradient fills
- Achievement badges in gold with icons
- Streak flame icons for consecutive days

### E. Animations
**Strategic Use Only**:
- Day completion: Subtle scale + checkmark fade-in (300ms)
- Achievement celebration: Confetti burst animation (2s, single play)
- Progress bar fills: Smooth width transition (1s ease)
- Card hover: Gentle lift transform (200ms)
- Modal entrance: Fade + scale from center (300ms)

**Avoid**: Continuous looping animations, distracting scroll effects, excessive micro-interactions

## Layout Structure

### Welcome/Onboarding Screen
- Centered vertical layout
- App logo/icon at top
- Welcome title
- Subtitle explanation
- Challenge duration selection grid (5 cards: 21, 45, 90, 180, 365 days)
- Start button

### Main App View
- Top navigation bar
- Dashboard stats grid (2-3 cards showing streaks, progress, days remaining)
- Daily check-in card (prominent, central placement)
- Monthly calendar view (largest component)
- Bottom padding for comfortable scrolling

### Challenge Reset Modal
- Overlay with backdrop blur
- Centered modal card
- Warning message
- Text area for promise
- Button row

### Achievement Screen
- Full-screen celebration
- Vertically centered content
- Achievement graphic
- Stats summary
- CTA buttons at bottom

## Images
**Hero/Welcome**: Include inspirational lifestyle image (person meditating, running, journaling) with subtle overlay for text readability - use as background for welcome screen.

**Achievement Graphics**: Trophy, badge, or medal illustrations for completion celebrations.

**Empty States**: Subtle illustrations when no data exists yet.

## Accessibility
- High contrast maintained (#212121 on #FAFAFA)
- Focus states on all interactive elements
- Aria labels for calendar days and progress indicators
- Minimum touch target 44x44px for mobile
- Clear visual feedback for all state changes