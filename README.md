# Wise Choice — UGC NET JRF Paper I (PWA)

Same app, same features — now installable and fully offline. Questions are added **inside the app** (🗂 Questions): no file edits, no site update.

## Host it (needed once)
A PWA must be served over **HTTPS** (or localhost). Upload this whole folder to GitHub Pages, Netlify or Cloudflare Pages (all free), open the link on your phone, then **Install app / Add to Home Screen**. After the first load it works with no internet.

Test locally: `python3 -m http.server 8000` → http://localhost:8000

## Adding questions (in the app)
🗂 Questions (top bar, Home card, or Settings):
- **Bulk import** – pick JSON / CSV files (several at once) or paste text. One file can hold many shifts. Choose *Add to it* or *Replace it*; duplicates are skipped.
- **Add manually** – pick/create a shift, unit, optional passage/table, question, 4 options, answer, explanation. Live preview. Edit / delete any question later in **Library**.
- Everything is stored on the device (IndexedDB). Use Settings → Backup to move it between devices; Library → ⬇ exports in the same import format.

## Tables
In passage, question or explanation text, write one row per line with cells split by ` | `; the first row is the header:
```
Table: Students enrolled
Year | Arts | Science
2021 | 120 | 150
```
or use `"table": {"title":"…","head":[…],"rows":[[…]]}` in JSON. HTML `<table>` (your old format) still works. Wide tables scroll sideways inside the card.

## Files
`samples/sample_questions.json` · `samples/sample_questions.csv` · `samples/AI_PROMPT.txt` (turns any paper into the JSON format)

## Updating the app itself
After changing any app file, bump `VERSION` in `sw.js`; users see an “Update” button.
