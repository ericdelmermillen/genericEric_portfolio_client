# The GenericEric Portfolio React App

**The GenericEric Portfolio** is a sleek React-based front end for Eric Millen’s full-stack portfolio. It showcases Eric's web development projects, dynamically integrates with YouTube to display videos, and includes an admin panel for managing content. With support for dark and light modes, it ensures a great user experience in any environment.

---

## Features

- **Responsive Design**: SCSS-based styling optimized for desktop, tablet, and mobile devices.
- **Dark/Light Mode**: Persistent user preference with a smooth custom toggle.
- **Admin Tools**: Manage projects with add, edit, and delete functionality.
- **Image Upload**: Posts images to an AWS S3 bucket after obtaining a pre-signed URL from the backend.
- **YouTube Integration**: Fetches and displays Eric's blog latest videos using the YouTube API.
- **Interactive UI**: Real-time form validation, dynamic routing, pagination for projects and blog pages, and toast notifications.

---

## Tech Stack

- **React** (v18) for UI
- **React Router DOM** (v7) for navigation
- **SCSS** following BEM class naming conventions for styling
- **React Hot Toast** for notifications
- **YouTube API** for video integration
- **Vite** for fast development

---

## Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Steps

1. Clone the repo:
   ```bash
   git clone https://github.com/ericdelmermillen/genericEric_portfolio_client
   cd genericeric_portfolio_client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

---

## Scripts

- `dev`: Run development server.
- `build`: Create a production build.
- `preview`: Serve the production build locally.
- `lint`: Check code quality.

---

## License

MIT License. See the [LICENSE](./LICENSE) file for details.
