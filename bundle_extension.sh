#!/bin/bash

# Navigate to the project root
cd "$(dirname "$0")"

# Ensure any existing zip is removed
rm -f github-pr-formatter.zip

# Zip the contents of the src directory
cd src && zip -r ../github-pr-formatter.zip ./*

echo "Bundle created: github-pr-formatter.zip"

