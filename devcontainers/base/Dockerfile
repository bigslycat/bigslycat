ARG UBUNTU_VERSION=25.10

FROM ubuntu:${UBUNTU_VERSION}

ARG USERNAME='vscode'

ENV DEBIAN_FRONTEND='noninteractive'

RUN \
  apt update \
  && apt dist-upgrade -y \
  && apt install -y bash zsh locales shellcheck shfmt git sudo nano ca-certificates curl watchman \
  && apt clean \
  && echo 'ru_RU.UTF-8 UTF-8' > '/etc/locale.gen' \
  && echo 'en_US.UTF-8 UTF-8' >> '/etc/locale.gen' \
  && locale-gen \
  && update-locale LANG='ru_RU.UTF-8'

ENV DEBIAN_FRONTEND=''
ENV EDITOR='nano'

RUN \
  groupadd "${USERNAME}" \
  && useradd -m -d "/home/${USERNAME}" -s '/usr/bin/zsh' --gid "${USERNAME}" -m "${USERNAME}" \
  && echo "${USERNAME} ALL=(root) NOPASSWD:ALL" > "/etc/sudoers.d/${USERNAME}" \
  && chmod 0440 "/etc/sudoers.d/${USERNAME}"

USER "${USERNAME}":"${USERNAME}"

COPY --chown="${USERNAME}":"${USERNAME}" --chmod=644 ./.zshrc "/home/${USERNAME}/.zshrc"

# Installing Starship: https://starship.rs
RUN curl -sS 'https://starship.rs/install.sh' | sh -s -- --yes

# Configuring Starship
RUN mkdir "/home/${USERNAME}/.config"
RUN chown "${USERNAME}:${USERNAME}" "/home/${USERNAME}/.config"
COPY --chown="${USERNAME}:${USERNAME}" --chmod=644 './starship.toml' "/home/${USERNAME}/.config/starship.toml"

# Installing SourceCraft Code Assistant
RUN curl -sSLo "/home/${USERNAME}/yandex-code-assist.vsix" \
  'https://storage.yandexcloud.net/yandex-code-assistant/plugins/vscode/yandex-code-assist.vsix' \
  && chown "${USERNAME}":"${USERNAME}" "/home/${USERNAME}/yandex-code-assist.vsix"
