ARG BASE_VERSION=latest

FROM bigslycat/devcontainer-node:${BASE_VERSION}

ARG RUST_VERSION

# Installing RUST
RUN curl --proto '=https' --tlsv1.2 -sSf 'https://sh.rustup.rs' | sh -s -- \
  --default-toolchain "${RUST_VERSION}" \
  -y
