#!/bin/bash
versions=$(cat .pyversions) || {
    echo "run this script from the main server directory."
    exit 1
}
for version in $versions; do
    pyenv install $version
done
