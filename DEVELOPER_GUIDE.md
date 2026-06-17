# The Own Professional Collaboration (OPC) Developer Handbook

Welcome to the **OPC WebApp** developer guide. This document serves as the absolute single source of truth for the codebase, CI/CD pipeline, branching strategy, and deployment configuration. Whether you are a new developer onboarding to the team or a senior developer doing a quick reference check, this handbook contains every technical detail you need to know to safely contribute to the project.

---

## Table of Contents
1. [Architecture & Technology Stack](#1-architecture--technology-stack)
2. [Local Environment Setup](#2-local-environment-setup)
3. [Environment Variables Configuration](#3-environment-variables-configuration)
4. [Git Workflow & Branching Strategy](#4-git-workflow--branching-strategy)
5. [Pull Requests & Code Reviews](#5-pull-requests--code-reviews)
6. [The CI/CD Pipeline (GitHub Actions)](#6-the-cicd-pipeline-github-actions)
7. [Vercel Deployment & Configuration](#7-vercel-deployment--configuration)
8. [Frontend & Backend Modification Guide](#8-frontend--backend-modification-guide)

---

## 1. Architecture & Technology Stack

The OPC WebApp operates on a modern, serverless architecture deployed to Vercel. It is built to bridge the gap between Brands and Creators.

**Backend Framework:** FastAPI (Python)
- FastAPI serves as both the API router and the Jinja2 HTML template renderer.
- **Serverless Paradigm:** When deployed to Vercel, the `main.py` file acts as a Vercel Serverless Function. Each HTTP request spins up an isolated instance of the Python backend.

**Frontend Stack:** Vanilla HTML, CSS, Javascript
- No heavy frontend frameworks (React, Vue) are used. 
- Frontend code utilizes Jinja2 templates (located in `/templates`) and static assets (located in `/static/js`, `/static/css`).

**Infrastructure:** Vercel
- Vercel handles SSL, global CDN distribution, and routing.

> [!WARNING]
> Because Vercel uses Serverless Functions for the backend, any local variables saved in Python memory will be wiped between HTTP requests. Always rely on a secure Database or external storage for state persistence.

---

## 2. Local Environment Setup

To run this application locally, you must set up your Python environment correctly to avoid dependency conflicts with your operating system.

### Step 1: Clone the Repository
Always clone directly from GitHub. Do not download the ZIP file.
```bash
git clone https://github.com/theowncollab/OPC_v2.git
cd OPC_v2/OPC_WebApp_v2
```

### Step 2: Create a Virtual Environment
We strictly enforce the use of Python Virtual Environments (`venv`) to keep project packages isolated.
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```
*(You will know it worked if your terminal prompt now starts with `(venv)`)*

### Step 3: Install Dependencies
With your virtual environment active, install the required packages:
```bash
pip install -r requirements.txt
```

### Step 4: Run the Development Server
Use `uvicorn` to start the local FastAPI server with live-reloading enabled.
```bash
uvicorn main:app --reload
```
You can now view the app in your browser at `http://127.0.0.1:8000`.

---

## 3. Environment Variables Configuration

The application requires numerous secrets (passwords, API keys, endpoints) to function. **Never commit secrets to GitHub.**

### The `.env` File
You must create a file named exactly `.env` in the root folder (`OPC_WebApp_v2/.env`). This file is listed in `.gitignore` so it will never be uploaded to GitHub.

> [!IMPORTANT]
> The `.env` file should look exactly like this template. Ask your team administrator for the actual values for the passwords and keys.

```env
ENVIRONMENT="DEVELOPMENT"

# Database Configuration
DB_USER="root"
DB_PASSWORD="your_secure_password_here"

# SMTP Email Configuration
SMTP_SERVER="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="opc.owncollab@gmail.com"
SMTP_PASSWORD="your_app_password_here"

# Google Authentication
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"

# Security Keys
SECRET_KEY="your_secure_random_hash_here"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES="15"
REFRESH_TOKEN_EXPIRE_DAYS="7"

# External Routing URLs
WEB_APP_URL="https://theowncollab.com"
DASHBOARD_URL="https://dashboard.theowncollab.com"

# Google Apps Script Webhook
GSCRIPT_URL="https://script.google.com/macros/s/your_unique_id/exec"
```

> [!CAUTION]
> Notice the `GSCRIPT_URL`. Ensure there is NO trailing semicolon (`;`) inside or outside the quotes, or it will cause a 404 error when Javascript fetches it!

---

## 4. Git Workflow & Branching Strategy

To ensure zero downtime and prevent catastrophic bugs from reaching the live website, we employ a strict Git branching strategy.

### The Two Golden Rules
1. **Never edit files directly on the GitHub website.** All code changes must be made locally in your IDE, tested, and pushed via your terminal.
2. **Never push directly to `main`.** The `main` branch is physically locked. You must use branches.

### The Branching Architecture
- **`main`**: The Production branch. This is exactly what live users see on `theowncollab.com`.
- **`staging`**: The Beta/Integration branch. All new features are pushed here first for QA testing and Preview generation.

### How to Write Code (Daily Workflow)
When you sit down to work on a new feature:

1. **Sync your local computer:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Switch to staging (or a feature branch):**
   ```bash
   git checkout staging
   git pull origin staging
   ```
3. **Write your code.**
4. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Added a new contact form route"
   git push origin staging
   ```

---

## 5. Pull Requests & Code Reviews

Once your code is on the `staging` branch, it needs to be merged into `main` to go live.

### Creating a Pull Request (PR)
1. Go to the GitHub repository online.
2. You will see a yellow banner: `"staging had recent pushes"`. Click **Compare & pull request**.
3. Write a brief description of what your code does and click **Create pull request**.

### The Approval Ruleset (Branch Protection)
The `main` branch is protected by strict GitHub Rulesets. The following requirements MUST be met before the "Merge" button unlocks:
1. **Approval Required**: Another human being on your team must review your code and click the "Approve" button.
   > *Note: GitHub explicitly prevents Pull Request authors from approving their own PRs.*
2. **Status Checks Must Pass**: The CI/CD pipeline (flake8) must return a green checkmark indicating the code has no fatal syntax errors.

---

## 6. The CI/CD Pipeline (GitHub Actions)

We use GitHub Actions to automate Continuous Integration (CI) and Continuous Deployment (CD). The configuration files are located in `.github/workflows/`.

### 1. `staging.yml`
This workflow triggers automatically whenever a Pull Request is opened.
- **Code Quality Check (`flake8`)**: It scans the Python code for syntax errors, undefined variables (like forgetting an `import`), and fatal bugs. If it finds an error, the PR is blocked from merging.
- **Vercel Preview**: It automatically communicates with Vercel to generate an isolated "Preview URL". This allows the team to literally click a link and interact with the new code in a live web browser before it ever touches production.

### 2. `production.yml`
This workflow triggers automatically when a Pull Request is successfully merged into `main`. It tells Vercel to instantly build the code and deploy it to `theowncollab.com`.

---

## 7. Vercel Deployment & Configuration

Vercel acts as our cloud hosting provider.

### Vercel Dashboard Configurations
If you ever add a new variable to your local `.env` file, you **must** also add it to the Vercel Dashboard, or the live site will crash.
- **How to add variables:** Go to Vercel.com -> Select the Project -> **Settings** -> **Environment Variables**. Paste your key and value, and click Save.

### Domain Management
Our custom domains (`theowncollab.com` and `www.theowncollab.com`) are attached directly in Vercel.
- **How to manage domains:** Go to Vercel.com -> Select the Project -> **Settings** -> **Domains**. 

> [!WARNING]
> A custom domain can only be attached to **one Vercel project at a time**. If you are migrating projects, you must completely remove the domain from the old project before Vercel will allow you to add it to the new one.

### Vercel Hobby Tier Limitations
Currently, the project runs on Vercel's Free "Hobby" tier. Be aware of the following technical limit:
- **Serverless Timeout:** FastAPI runs as a Vercel Serverless Function. On the free tier, Vercel implements a **10-second timeout cutoff**. If any database query, API call, or email dispatch takes longer than 10 seconds to execute, Vercel will terminate the request and return a 504 error to the user.

---

## 8. Frontend & Backend Modification Guide

### Backend: Adding a New Route
FastAPI routes are separated into modules inside the `/routes/` directory to keep `main.py` clean. 
1. If adding an authentication route, put it in `routes/auth.py`.
2. Ensure the router is included in `main.py`:
   ```python
   # Example in main.py
   app.include_router(router=auth.router, prefix="/auth", tags=["Authentication"])
   ```

### Frontend: Modifying Javascript
When writing `fetch()` requests in Javascript (`/static/js/`), **never** hardcode the full domain URL (like `https://theowncollab.com/api/...`). 

Because we use multiple environments (Localhost, Vercel Previews, Production), you must use **Relative Paths**.

**WRONG (Do not do this):**
```javascript
fetch('https://theowncollab.com/contact-us', { ... })
fetch(`${window.API_BASE_URL}/contact-us`, { ... })
```

**CORRECT (Do this):**
```javascript
fetch('/contact-us', { ... })
```
Using relative paths ensures the API call automatically hits whatever server the user is currently viewing (localhost, preview, or production).

### Frontend: Modifying HTML Templates
All HTML files are stored in the `/templates/` folder and use Jinja2 templating syntax. 
- **Inheritance:** We use `{% extends "base.html" %}`. 
- **Google Tags:** The `gtag.js` tracking script is located centrally inside `base.html`. Do not paste the `gtag` script into individual child templates (like `contact-us.html` or `index.html`), as it will cause duplicate tracking and bloat the code.

---
*End of Developer Handbook. Happy Coding!*
