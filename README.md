# Sai Govind Portfolio

Professional portfolio for Sai Govind, AI & ML Specialist.

## 🚀 Features
- **Dynamic Hero Section**: Circular profile picture and balanced layout.
- **Health & Gym Tracker**: Interactive 7-day workout schedule and stats dashboard.
- **MongoDB Integration**: Contact form submissions are saved to a MongoDB database.
- **Modern UI**: Dark-themed gym sections and clean light-themed about section.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js (Deployed on Vercel)
- **Database**: MongoDB Atlas
- **Hosting**: GitHub Pages (Frontend) & Vercel (Backend)

## 📦 Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   ```
4. **Run the backend**:
   ```bash
   node api/index.js
   ```
5. **Open `index.html`** in your browser.

## 🌐 Deployment Instructions

### 1. GitHub Hosting (Frontend)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to Repository Settings > **Pages**.
3. Select "Deploy from a branch" and choose `main`.

### 2. Vercel Hosting (Backend)
1. Connect your GitHub repository to **Vercel**.
2. Vercel will automatically detect the `api/` directory.
3. Add your `MONGODB_URI` in Vercel's **Environment Variables** settings.
4. Deploy!

### 3. Connect Frontend to Vercel
Once deployed, update the `API_URL` in `script.js` to point to your live Vercel URL if you are using separate hosting.
