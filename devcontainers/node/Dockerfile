ARG BASE_VERSION=latest

FROM bigslycat/devcontainer-base:${BASE_VERSION}

ARG USERNAME='vscode'
ARG NVM_VERSION='0.40.3'
ARG NODE_VERSION='node'

# Installing NVM and Node.js
ENV NVM_DIR="/home/${USERNAME}/.nvm"
RUN curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh" | bash \
  && \. "${NVM_DIR}/nvm.sh" \
  && nvm install "${NODE_VERSION}" \
  && nvm use "${NODE_VERSION}" \
  && corepack enable yarn

RUN echo 'export PATH="$HOME/.yarn/bin:$PATH"' >> "/home/${USERNAME}/.zshrc"
