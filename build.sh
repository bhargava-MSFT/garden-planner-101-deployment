#!/bin/bash
set -e

echo "Setting up build environment..."
npm ci

echo "Making vite executable..."
chmod +x node_modules/.bin/vite

echo "Building application..."
npm run build

echo "Build completed successfully!"
