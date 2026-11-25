# Northstar Student Portal

A responsive, static student portal built with HTML, CSS, and vanilla JavaScript. It is designed to publish directly to GitHub Pages and does not require a server, API, or database.

## Features
- Dashboard with semester overview and today's classes
- Weekly class timetable with print support
- Course grades with filters and progress bars
- Announcements with category filters
- Student profile with editable demo details
- Responsive sidebar/navigation for mobile
- Profile edits saved locally in the browser using `localStorage`

## Run locally
Open `index.html` in a browser. For a local development server, you can use VS Code Live Server or run `python -m http.server` in this folder.

## Publish with GitHub Pages
1. Create a GitHub repository (for example, `student-portal`).
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for the Pages URL shown in Settings → Pages.

## Customize
- Replace the sample student identity and academic details in `index.html`.
- Update the sample courses, class timetable, and announcements near the top of `script.js`.
- Adjust colors and layout in `styles.css`.
- Google Fonts are loaded from Google Fonts; remove the font links/imports to use system fonts only.

## Important
This is a front-end demo. Grades, announcements, and timetable data are static examples in `script.js`. Profile changes are stored only in the visitor's browser and are not synchronized across devices. Do not publish real student personal information or official grades in a public repository.
