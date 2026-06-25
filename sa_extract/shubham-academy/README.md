# 🎓 Shubham Academy — Official Website (v2)

Static frontend website with **EmailJS** for contact form. No backend server needed.

---

## 🚀 To Run Locally

### Option A — Just open in browser (simplest)
Double-click `public/index.html` to open directly in Chrome/Edge.

### Option B — Local dev server (recommended)
```bash
# Install Node.js from https://nodejs.org first
cd shubham-academy
npm start
# Opens at http://localhost:3000
```

---

## 📧 How to Add EmailJS Keys

See detailed instructions in the ZIP — or follow the guide below.

1. Go to https://www.emailjs.com and create a free account
2. Add a service (Gmail recommended)
3. Create an email template
4. Copy your Public Key, Service ID, Template ID
5. Open `public/js/main.js` and replace:
   - `YOUR_SERVICE_ID`  → your actual Service ID
   - `YOUR_TEMPLATE_ID` → your actual Template ID
   - `YOUR_PUBLIC_KEY`  → your actual Public Key

---

## 📁 Structure

```
shubham-academy/
├── public/
│   ├── index.html       ← Full website
│   ├── css/style.css    ← All styles
│   └── js/main.js       ← JS + EmailJS form logic
├── package.json
└── README.md
```

© 2025 Shubham Academy
