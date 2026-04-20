# Saad Naseem — Personal Profile

Static single-page profile site. No build step.

## Files

- `index.html` — all content/sections
- `styles.css` — design system (dark default, light toggle)
- `script.js` — theme toggle, typewriter, scroll reveals, active nav
- `netlify.toml` — Netlify headers + publish config
- `Naseem_Saad_Resume.pdf` — linked from the hero/contact sections

## Local preview

Any static server works. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

### Netlify (recommended, matches the reference template)

1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import from Git** → pick the repo.
3. Leave build command empty; publish directory is `.`.
4. Add a custom domain under **Domain settings** (optional).

Or drag-and-drop the folder at <https://app.netlify.com/drop>.

### Vercel

```bash
npx vercel --prod
```

Accept the defaults — Vercel serves it as a static site.

### GitHub Pages

Push to `main`, then enable Pages: **Settings → Pages → Source: Deploy from branch → main / root**.

## Edit checklist

- Roles cycled in the hero live in `script.js` (`roles` array).
- Publications, experience, awards live directly in `index.html`.
- Replace `Naseem_Saad_Resume.pdf` when you update the CV.
