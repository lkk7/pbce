# For a development server run:
# docker run -it --rm -p 8080:8080 --mount type=bind,source="$(pwd)",target=/root/server pbce poetry run uvicorn pbce_server.main:app --host 0.0.0.0 --port 8080 --reload
FROM python:3.10 as build
SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND="noninteractive" PYVERSIONS_PATH="/root/.pyenv/versions"
COPY . /root/server
RUN apt-get update && apt-get install --no-install-recommends -y \
    # install pyenv dependencies and git
    make build-essential libssl-dev zlib1g-dev libbz2-dev \
    libreadline-dev libsqlite3-dev wget curl llvm libncursesw5-dev xz-utils \
    tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    # install pyenv 2.3.4 
    && git clone https://github.com/pyenv/pyenv.git /root/.pyenv \
    && cd /root/.pyenv && git checkout 2b221456707fddb887169cf2f6fb7ac30bfff684 \
    && export PYENV_ROOT="/root/.pyenv" \
    && command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH" \
    && eval "$(pyenv init -)" \
    # install all Python versions
    && cd /root/server && ./scripts/all_python_install.sh \
    # install the server poetry dependencies
    && pip3 install --no-cache-dir poetry && poetry install \
    # clean up
    && rm -r /tmp/*
WORKDIR /root/server
CMD ["poetry", "run", "uvicorn", "pbce_server.main:app", "--host", "0.0.0.0", "--port", "8080"]