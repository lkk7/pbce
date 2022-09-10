FROM ubuntu:latest as build
SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND="noninteractive" PYVERSIONS_PATH="/root/.pyenv/versions"
COPY . /root/server
RUN apt-get update && apt-get install -y \
    # install pip3, poetry, pyenv dependencies and git
    python3-pip make build-essential libssl-dev zlib1g-dev libbz2-dev \
    libreadline-dev libsqlite3-dev wget curl llvm libncursesw5-dev xz-utils \
    tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git \
    # install pyenv 2.3.4
    && git clone https://github.com/pyenv/pyenv.git /root/.pyenv \
    && cd /root/.pyenv && git checkout 2b221456707fddb887169cf2f6fb7ac30bfff684 \
    && export PYENV_ROOT="/root/.pyenv" \
    && command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH" \
    && eval "$(pyenv init -)" \
    # install all Python versions
    && cd /root/server && ./scripts/all_python_install.sh \
    # install the server poetry dependencies
    && pip3 install poetry && poetry install --without dev \
    # clean up
    && rm -r /tmp/*
WORKDIR /root/server