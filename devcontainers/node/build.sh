#!/usr/bin/env sh

BASE_VERSION='beta' \
  devcontainer build \
    --workspace-folder ./devcontainers/node \
    --image-name bigslycat/devcontainer-node:beta \
    --platform linux/amd64,linux/amd64/v2,linux/arm64 \
    --push
