ARG BASE_VERSION=latest

FROM bigslycat/devcontainer-base:${BASE_VERSION}

ARG RUST_VERSION=1.87.0

# Installing RUST
RUN curl --proto '=https' --tlsv1.2 -sSf 'https://sh.rustup.rs' | sh -s -- -y --default-toolchain "${RUST_VERSION}"
