#!/bin/bash

set -e

cd "$(dirname "$0")"

# --------------------------------------------------
# Settings
# --------------------------------------------------
ANGULAR_DIR="angular"
WEB_DIR="web"
PROJECT_NAME="angular"
ANGULAR_CLI_VERSION="20"

show_help() {
    echo "Usage: $0 [mode]"
    echo "  mode: 'production' (default) or 'development'"
    echo "Example"
    echo "  $0             # builds production"
    echo "  $0 development # builds development with source maps"
}

# Show help menu
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    show_help
    exit 0
fi

# Check Angular CLI
if ! command -v ng &> /dev/null; then
    echo "Angular CLI not found. Installing..."
    npm install -g @angular/cli
fi

# Mode (default to production)
MODE=${1:-production}


# --------------------------------------------------
# Create Angular-project if it does not exist
# --------------------------------------------------
mkdir -p "$ANGULAR_DIR"

if [ ! -s "$ANGULAR_DIR/package.json" ]; then
    echo "No Angular-project was found in $ANGULAR_DIR - Creating new project"
    rm -f "$ANGULAR_DIR/package.json"

    npx --yes @angular/cli@$ANGULAR_CLI_VERSION new "$PROJECT_NAME" \
        --directory "$ANGULAR_DIR" \
        --defaults \
        --routing \
        --style=css \
        --ssr=false \
        --skip-git \
        --skip-install
fi


# --------------------------------------------------
# Build Angular
# --------------------------------------------------
echo "Building Angular in $MODE mode..."

pushd $ANGULAR_DIR > /dev/null

echo "Installing/updating Node.js dependencies"
if [ -f package-lock.json ]; then
    npm ci || npm install
else
    npm install
fi

npx --no-install ng version
npx --no-install ng build --configuration "$MODE"

popd > /dev/null


# --------------------------------------------------
# Find build-output
# --------------------------------------------------
BUILD_DIR=$( find "$ANGULAR_DIR/dist" -mindepth 2 -maxdepth 2 -type d -name browser 2>/dev/null | head -n1 || true )

if [ -z "$BUILD_DIR" ]; then
    BUILD_DIR=$( find "$ANGULAR_DIR/dist" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | head -n1 || true )
fi

if [ -z "$BUILD_DIR" ] || [ ! -d "$BUILD_DIR" ]; then
    echo "Could not find the build-output in $ANGULAR_DIR/dist"
    exit 1
fi

echo "Build output: $BUILD_DIR"
echo "Angular build size: $(du -sh "$BUILD_DIR" | cut -f1)"

# --------------------------------------------------
# Webserver
# --------------------------------------------------
mkdir -p "$WEB_DIR"

# Clean up
echo "Cleaning old build from $WEB_DIR..."
find "$WEB_DIR" -mindepth 1 ! -name ".gitkeep" -exec rm -rf {} +


echo "Copying new build to $WEB_DIR..."
cp -r "$BUILD_DIR"/. "$WEB_DIR"/

echo "Done!"
