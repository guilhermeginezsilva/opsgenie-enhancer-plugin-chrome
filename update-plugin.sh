# Exit immediately if a command exits with a non-zero status
set -e

# Function to check the auto-update configuration
check_auto_update_config() {
    if [[ -f ./auto-update-plugin.conf ]]; then
        config_content=$(cat ./auto-update-plugin.conf)
        if [[ "$config_content" == "true" ]]; then
            return 0
        fi
    fi
    return 1
}

# Check if the script received a parameter
if [[ "$1" == "true" ]]; then
    if check_auto_update_config; then
        echo "Plugin automatic update is enabled. Proceeding with the update."
    else
        echo "Plugin auto-update config is disabled. Exiting."
        exit 0
    fi
else
    echo "Building sources"
    ./build.sh
fi

# Continue with the normal update process
if [[ -d ./dist ]]; then
    echo "Dist directory already exists, clearing it"
    rm -r ./dist
fi

echo "Creating dist directory"
mkdir ./dist
mkdir ./dist/images

echo "Copying resources"
cp ./build/* ./dist/
cp ./src-popup/popup.html ./dist/

cp ./images/* ./dist/images/
cp ./manifest.json ./dist/
cp ./styles.css ./dist/

cp ./LICENSE ./dist/

echo "Updated successfully"