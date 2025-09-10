# 📦 Garden Planner 101 - Local Deployment Package

## 🎯 What's Included:
- ✅ **Built React app** (in `dist/` folder)
- ✅ **Source code** (in `src/` folder) 
- ✅ **Azure configuration** (`staticwebapp.config.json`)
- ✅ **Package files** (`package.json`, `vite.config.js`)

## 🚀 Deploy to Azure Static Web Apps (Manual Upload)

### Step 1: Download this package to your local machine
1. Download the `garden-planner-101-deployment.zip` file
2. Extract it to a folder on your computer

### Step 2: Deploy to Azure
1. **Go to Azure Portal**: https://portal.azure.com
2. **Create Static Web App**:
   - Search for "Static Web Apps"
   - Click "Create"
   - Fill in details:
     - **Resource Group**: Create new `garden-planner-rg`
     - **Name**: `garden-planner-101`
     - **Region**: Choose closest to you
     - **Deployment Source**: Select "Other"
3. **Click "Review + Create"** then **"Create"**

### Step 3: Upload your app
1. **After creation**, go to your new Static Web App resource
2. **Click "Browse"** to see the default page
3. **Go to "Overview"** → **"Manage deployment token"**
4. **Copy the deployment token**
5. **Use Azure CLI or VS Code extension** to deploy:

#### Option A: Using Azure CLI
```bash
# Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
az login
cd path/to/your/extracted/folder
az staticwebapp deploy --name garden-planner-101 --resource-group garden-planner-rg --source ./dist
```

#### Option B: Using GitHub Actions (Recommended)
1. **Upload to a new GitHub repo** (public or private)
2. **Add deployment token** as GitHub secret: `AZURE_STATIC_WEB_APPS_API_TOKEN_GARDEN_PLANNER`
3. **Push code** - GitHub Actions will automatically deploy

## 🎉 Alternative: Quick Deploy Options

### Vercel (Super Easy)
1. Go to https://vercel.com
2. Import your GitHub repo or drag & drop the `dist/` folder
3. Deploy in seconds!

### Netlify (Also Easy)  
1. Go to https://netlify.com
2. Drag & drop the `dist/` folder
3. Instant deployment!

## 📱 Your App Features:
- 🌱 **Plant Selection**: Choose from 10+ common vegetables
- 🌍 **Zone-Based**: Planting dates for hardiness zones 4-7
- 📱 **Mobile Friendly**: Responsive design with emoji UI
- ⚡ **Fast Loading**: Optimized React build

## 🛠️ Local Development:
```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
```

Your Garden Planner 101 is ready to help gardeners plan their perfect garden! 🌱🚀
