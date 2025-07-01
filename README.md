# 🌳 Linktree Clone

A modern, editable Linktree-style page – no backend required!  
All data is stored in the browser (localStorage) and editing is simple and intuitive.

---

## ✨ Features

- Editable profile (avatar, name, bio, light/dark mode)
- Add, edit, delete, and reorder links (drag & drop)
- All data stored in localStorage (works offline)
- Modern, responsive design (TailwindCSS, Heroicons)
- Upload avatar with live preview
- Ready to run in Next.js (App Router)

---

## 🖼️ Demo

![Page preview](https://i.imgur.com/4lkLhPc.png)

---

## 🚀 How to run locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jacob22092/Linktree.git
   cd Linktree
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📦 Copying this project from CodeSandbox to GitHub

If you started in CodeSandbox, you can easily move your project to this repository:

1. **Download your project from CodeSandbox:**
   - Click the "Export" or "Download ZIP" option in CodeSandbox.
   - Unzip the downloaded file on your computer.

2. **Copy the files into this repository:**
   - Replace the contents of this repository with your files, or copy-paste your files into the appropriate folders.

3. **Stage, commit, and push the changes:**
   ```bash
   git add .
   git commit -m "Import project from CodeSandbox"
   git push
   ```

Now your CodeSandbox project is saved in your GitHub repository!

---

## 🧩 Requirements

- Node.js 18+
- NPM / Yarn / pnpm
- Next.js 13+ (App Router)
- TailwindCSS (already configured)
- @heroicons/react

---

## 🛠️ TailwindCSS Configuration

Tailwind is already configured.  
To change colors or styles, edit `tailwind.config.js` and `app/globals.css`.

---

## 📁 Project Structure

```
/
├── app/
│   └── page.tsx            # Main Linktree component
├── public/
│   └── (you can add your own images here)
├── tailwind.config.js
├── app/globals.css
├── package.json
└── README.md
```

---

## 📝 Notes

- All profile and link data is stored in the user's browser (localStorage).
- No backend or database required.
- Easily deploy to Vercel, Netlify, Render, etc.

---

## 📬 Contact

Made by Jacob22092  
Github: [Jacob22092](https://github.com/Jacob22092)
