# Abhay Upadhyay · Portfolio

Personal portfolio site built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The output goes to `dist/`.

## Editing content

All text on the site (services, projects, experience, certificates, contact details) lives in `src/data.js` and `src/App.jsx`.

## Contact form

The form sends messages through [Web3Forms](https://web3forms.com). Get a free access key, then set `VITE_WEB3FORMS_KEY` in `.env.local` locally or in your hosting provider's environment variables. Without a key, the form falls back to opening the visitor's mail app.
