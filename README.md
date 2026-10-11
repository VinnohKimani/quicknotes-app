# QuickNotes

QuickNotes is a lightweight, responsive web application designed for fast and effective note-taking directly in the browser. Users can quickly create notes, assign them to distinct categories, search through existing entries in real-time, and persist data across browser sessions.

## Features

- Add notes with category tags (Personal, Work, Study) with visually distinct styling.
- Input validation for empty input or text exceeding 200 characters.
- Live real-time search filtering.
- Data persistence using browser `localStorage`.
- Dynamic note counters reflecting state (`You have no notes yet.`, `1 note`, `N notes`).
- Confirmation-prompted "Clear All" batch removal functionality.
- Fully responsive layout optimized for mobile and desktop screens.

## Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/VinnohKimani/quicknotes-app.git](https://github.com/VinnohKimani/quicknotes-app.git)
   ```
2. Navigate into the directory:

   ```Bash
   cd quicknotes-app
   Open index.html in your web browser.
   ```

## What I Learned

- Managing secure DOM manipulations by building dynamic element trees using document.createElement() and textContent rather than innerHTML.

- Structuring responsive card layouts with CSS Flexbox and implementing state-driven CSS utility classes for different categories.

- Handling state serialization, array filtering, and persistent storage synchronization using localStorage APIs.
