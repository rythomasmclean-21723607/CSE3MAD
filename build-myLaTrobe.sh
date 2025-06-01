#!/bin/bash

# Set Java 17
JAVA_HOME_PATH=$(/usr/libexec/java_home -v 17 2>/dev/null)

if [ -z "$JAVA_HOME_PATH" ]; then
  echo "Java 17 not found. Please install it first (e.g., with sdkman or Homebrew)."
  exit 1
fi

echo "Setting JAVA_HOME to: $JAVA_HOME_PATH"
export JAVA_HOME="$JAVA_HOME_PATH"
export PATH="$JAVA_HOME/bin:$PATH"

# Verify Java version
echo "Java version set to: "
java -version

# Run EAS local build with cache clear
echo "Running EAS build (local, Android)"
eas build -p android --local --clear-cache
