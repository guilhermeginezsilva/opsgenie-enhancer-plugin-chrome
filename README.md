# Opsgenie Notes Enhancer

Opsgenie Notes Enhancer is a Chrome extension designed to enhance the Opsgenie alerts notes interface with additional features and a user-friendly interface.

## Features

- Improve notes written and readabillity in opsgenie alert details interface;
- Free to copy, fork, edit... MIT License;
- Enable or disable the plugin via a popup interface;

## Project Structure

- The source files are located in the src directory.
- The popup files are located in the src-popup directory.
- Update the icons in the images directory as needed.
- Update the manifest.json file to configure the extension.
- There are 3 shells explained in Setup, Build and Distribution sections to build and prepare the google chrome extension package.

## Prerequisites

### For developers
- Node.js
- npm

### To publish
- Just the dist directory with the extension files, like: manifest.json, popup html and js, unified-script.js and images directory with the icons ;

## First Setup

To set up the project, run the following command to install the necessary dependencies and set the required permissions for the build scripts:

```sh
chmod +x ./install.sh
./install.sh
```

This script will:

1. Install the required npm packages.
2. Make build.sh and update-plugin.sh executable.

## Build the source files
To build the source files, run:

```sh
./build.sh
```
This script will:

1. Run the Webpack build process to compile the source files into a single content.js file.

## Automatic Builds during development
To automate builds during the development, run:

```sh
./develop.sh
```
This script will:

1. Run the Webpack watch process, that will build automatically every time a file changes.
2. It will keep running until you close the used terminal.

## Generate or update plugin dist directory (Setup step required)
To update the plugin distribution, run:

```sh
./update-plugin.sh
```

This script will:

1. Build the source files.
2. Clean the dist directory.
3. Copy the necessary resources (content.js, popup.html, popup.js, images, and manifest.json) into the dist directory.

## How to Use (Developer)

1. Load the extension into Chrome:

- Go to chrome://extensions/.
Enable "Developer mode".
- Click "Load unpacked" and select the dist directory.
2. Click the extension icon in the Chrome toolbar to open the popup.
- Use the popup to enable or disable the plugin.
- If disabling, confirm the prompt to refresh the page.

## License
This project is licensed under the MIT License. See the LICENSE file for details.