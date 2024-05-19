#!/bin/bash

set -e

# Detect the operating system and call the corresponding function
case "$(uname -s)" in
    Linux*)
        ;;
    Darwin*)
        sudo xattr -rd com.apple.quarantine .
        ;;
esac


node index.mjs
