# 🛂 Passport Seva+ — Online Passport Application Portal

A fully functional, multi-page passport application portal built with vanilla HTML, CSS, and JavaScript. Features a modern dark-themed landing page, secure login system, and a guided 5-step application form with real-time validation.

---

## 📋 Table of Contents

- [Live Demo Credentials](#-live-demo-credentials)
- [Setup Instructions](#-setup-instructions)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Approach & Architecture](#-approach--architecture)
- [Tech Stack Justification](#-tech-stack-justification)
- [Pages Overview](#-pages-overview)

---

## 🔑 Live Demo Credentials

| Field    | Value                  |
|----------|------------------------|
| Email    | `hire-me@anshumat.org` |
| Password | `HireMe@2025!`         |

> Use these credentials on the **Login page** to access the application form.

---

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge)
- [Node.js](https://nodejs.org/) (v14+) — only needed for the local dev server

### Quick Start

```bash
# 1. Clone or download the project
cd "path/to/project-folder"

# 2. Start a local server (using npx serve)
npx -y serve -l 3000

# 3. Open in browser
# → Landing Page:  http://localhost:3000
# → Login Page:    http://localhost:3000/login.html
# → Application:   http://localhost:3000/application.html
```

### Alternative (No Node.js)

Simply open `index.html` directly in your browser — all pages work as static files. External fonts and icons load via CDN.

---

## 📁 Project Structure

```
├── index.html          # Landing page (hero + 3-step process)
├── login.html          # Login page (split-layout with form)
├── application.html    # Multi-step application form (6 views)
├── style.css           # Global styles (landing + login pages)
├── application.css     # Application form specific styles
├── script.js           # Landing page + login logic
├── application.js      # Multi-step form logic + validation
└── README.md           # This file
```

---

## ✨ Features

### Authentication
- Demo login with seeded credentials
- Client-side validation with error feedback
- Login state persisted via `localStorage`
- Redirect to application form on successful login

### Multi-Step Application Form
- **Step 0** — Welcome page with document checklist & estimated time
- **Step 1** — Personal Details (8 mandatory fields)
- **Step 2** — Address Information (6 mandatory fields + info box)
- **Step 3** — Passport Type & Details (radio option cards)
- **Step 4** — Document Upload (4 mandatory file uploads)
- **Step 5** — Book Appointment (city/centre dropdowns, date picker, time slot grid)
- **Success** — Confirmation page with application & appointment details

### Validation
- All fields are **mandatory** — form won't proceed until every field is filled
- Red error banners with descriptive messages per step
- Input focus clears error styling
- File upload validation (all 4 documents required)
- Time slot & dropdown validation on appointment step

### UI/UX
- Dark-themed landing page with blue gradient hero section
- Green navbar Login button, orange CTA buttons
- Smooth fade-in animations on page load
- Scroll-reveal animations for step cards
- Interactive stepper bar (orange = active, green ✓ = completed)
- Selectable option cards with radio-style indicators
- Time slot grid with Selected / Available / Taken states
- Fully responsive design (mobile, tablet, desktop)

---

## 🏗 Approach & Architecture

### Design Philosophy

The project follows a **page-per-concern** architecture:

1. **Landing Page** (`index.html`) — Marketing/informational page to attract users
2. **Login Page** (`login.html`) — Authentication gate before the application
3. **Application Page** (`application.html`) — Single-page multi-step form using show/hide sections

### Multi-Step Form Pattern

Instead of multiple HTML pages for each form step, a **single-page step-switcher** pattern was used:

- All 6 views (welcome + 5 steps + success) exist as `<section>` elements in one HTML file
- JavaScript toggles the `.active` class to show/hide steps
- This approach avoids page reloads, preserves form state across steps, and enables smooth transitions
- Each step has its own validation function that runs before allowing progression

### Validation Strategy

- **Per-step validation** — Each step has a dedicated validator function (`validateStep1()` through `validateStep5()`)
- **Fail-fast** — Validates fields in order, stops at the first empty field, focuses it, and shows an error
- **Visual feedback** — Red border highlight on invalid inputs + error banner at top of form card
- **Auto-clear** — Error styling clears when user focuses the field

### Data Flow

```
Login → localStorage auth → Application Welcome → Step 1-5 (validated) → Success Page
```

The success page dynamically populates from form values:
- Applicant name from Step 1
- Application type & processing from Step 3
- Appointment details from Step 5
- Auto-generated Application ID and Token Number

---

## 🛠 Tech Stack Justification

| Technology | Choice | Justification |
|-----------|--------|---------------|
| **HTML5** | Structure | Semantic markup, native form validation attributes (`required`, `type`), accessibility |
| **CSS3** | Styling | Custom properties (CSS variables) for consistent theming, CSS Grid for layouts, Flexbox for alignment, `@keyframes` for animations — no build step needed |
| **Vanilla JS** | Logic | DOM manipulation, event delegation, `localStorage` for state — zero dependencies, instant load |
| **Inter (Google Fonts)** | Typography | Modern, professional sans-serif with excellent readability at all sizes |
| **Font Awesome 6** | Icons | Industry-standard icon library via CDN — consistent, scalable vector icons |

### Why No Framework?

- **Zero build step** — No `npm install`, no bundler, no compile time. Open and run.
- **Performance** — No framework overhead. Total JS is ~8KB across both scripts.
- **Simplicity** — The scope (3 pages, form validation, show/hide steps) doesn't warrant React/Vue complexity.
- **Portability** — Works on any static hosting (GitHub Pages, Netlify, S3, or just opening the HTML file).
- **Maintainability** — Clean separation: global styles in `style.css`, app styles in `application.css`, page logic in separate JS files.

### Why CSS Variables over Tailwind/SASS?

- Native browser support — no preprocessor or build tool required
- Centralized theming via `:root` custom properties
- Easy to maintain and modify color schemes
- Full control over specificity and cascade

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| `> 900px` | Desktop (full layout) |
| `600–900px` | Tablet (stacked login panels, single-column forms) |
| `< 600px` | Mobile (compact spacing, smaller typography) |

---

## 📄 License

This project was built as a submission for evaluation purposes.

**Author:** Dhruv Patil  
**Date:** March 2026
