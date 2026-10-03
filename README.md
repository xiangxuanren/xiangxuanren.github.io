# Xiangxuan Ren — Academic Homepage

A static academic homepage with an interactive title, research animation, and selected publications.

## Publishing

GitHub Pages serves the root of the `main` branch. No build step is required. Push changes to `main` to update the site.

## Editing

- `index.html`: biography, news, collaborators, and page structure.
- `app.js`: publication entries and their rendering; array order controls order within categories, with first-author papers shown first.
- `story.js` / `story.css`: research animation.
- `hero.js` / `hero.css`: interactive title and sound.
- `academic.css` / `styles.css`: publication layout and global styles.
- `assets/`: photographs, research figures, videos, and illustrations.

## Preview locally

Run `python3 -m http.server 8000`, then open http://localhost:8000.

Research figures and demos belong to their respective authors. See `assets/TABLER-LICENSE.txt` for the included icon license.
