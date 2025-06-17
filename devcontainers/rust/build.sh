#!/usr/bin/env sh

BASE_VERSION='beta' \
  devcontainer build \
    --workspace-folder ./devcontainers/rust \
    --image-name bigslycat/devcontainer-rust:beta \
    --platform linux/amd64,linux/amd64/v2,linux/arm64 \
    --push
