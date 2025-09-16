@echo off
echo Deploying to Azure Static Web Apps...
echo API Token: 5e70d9eeb11837c5ea513294816a0e3645d4395f6e5be2671d3d6e010dd1a2e001-c4e3024a-0ff7-4674-9120-149acb946ccf00f0312039e6ef0f
echo App URL: https://gray-glacier-039e6ef0f.1.azurestaticapps.net

REM First, make sure we have the latest build
npm run build

REM Create a zip file of the dist folder
powershell Compress-Archive -Path "dist\*" -DestinationPath "deploy.zip" -Force

echo Build completed. Deploy.zip created.
echo.
echo To complete deployment:
echo 1. Go to https://portal.azure.com
echo 2. Navigate to your Static Web App: garden-planner2
echo 3. Go to Overview tab
echo 4. Click "Browse" to check current version
echo 5. Use the deployment token to upload via GitHub or manual deployment
echo.
echo Your enhanced garden planner should be available at:
echo https://gray-glacier-039e6ef0f.1.azurestaticapps.net
pause
