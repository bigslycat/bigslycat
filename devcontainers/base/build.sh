#!/usr/bin/env sh

devcontainer build \
  --workspace-folder ./devcontainers/base \
  --image-name bigslycat/devcontainer-base:beta \
  --platform linux/amd64,linux/amd64/v2,linux/arm64 \
  --push
