ARG BASE_VERSION=latest

FROM bigslycat/devcontainer-base:${BASE_VERSION}

ARG NVM_VERSION
ARG NODE_VERSION

# Installing NVM and Node.js
RUN NVM_DIR="/home/$(whoami)/.nvm" \
  && curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh" | bash \
  && \. "${NVM_DIR}/nvm.sh" \
  && nvm install "${NODE_VERSION}" \
  && nvm use "${NODE_VERSION}" \
  && corepack enable yarn

RUN echo 'export NVM_DIR="$HOME/.nvm"' >> "/home/$(whoami)/.zshrc"
RUN echo 'export PATH="$HOME/.yarn/bin:$PATH"' >> "/home/$(whoami)/.zshrc"
