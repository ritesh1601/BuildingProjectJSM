# 🚀 BuildingProjectJSM

A modern full-stack startup listing platform built with **Next.js**, **Sanity.io**, and **TypeScript**. Users can discover startups, search in real-time, submit their own ventures, and authors can manage entries through an authenticated dashboard.

## 🧠 Key Features

- 🔐 **Authentication with GitHub** (via NextAuth)
- 📦 **Sanity CMS Integration** for content management
- 📝 **Markdown Support** for startup descriptions
- 🔍 **Real-Time Search** with URL syncing
- 🧾 **Author Auto-Creation** on login
- 📈 **Live View Count Updates** using Sanity Write API
- 🛠 **Error Monitoring** via Sentry
- 📃 **Form Validations** with smooth UX

---

## 🖥️ Demo

**Live URL:** [https://building-project-jsm.vercel.app](https://building-project-jsm.vercel.app)

---

## 🗂 Project Structure

---

## 🛠 Tech Stack

| Technology | Purpose                            |
|------------|------------------------------------|
| Next.js    | Full-stack framework               |
| TypeScript | Type safety                        |
| Sanity.io  | Headless CMS                       |
| NextAuth   | GitHub authentication              |
| Vercel     | Deployment                         |
| Sentry     | Error tracking                     |

---

## 🧪 Functionality Guide

### 👤 User Authentication
- Login via GitHub on the home page.
- If the logged-in user does not exist in the database, a new **author** record is created automatically.

### 🔍 Real-Time Search
- Use the search bar to find startups by name or keywords.
- The results auto-update based on query string in the URL.

### 📄 View Startups
- All startups are listed on the homepage with live view counts.
- Click any card to view full details with markdown-rendered descriptions.

### 🧑‍💼 Submit a Startup
- Logged-in users can navigate to `/submit` to fill out the **Startup Submission Form**.
- The form includes validation on all required fields.
- Submissions are sent to Sanity CMS and available instantly.

### 🧠 Author Pages
- Each author has a public profile page listing their submitted startups.

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/ritesh1601/BuildingProjectJSM.git
cd BuildingProjectJSM/my-app
npm install


