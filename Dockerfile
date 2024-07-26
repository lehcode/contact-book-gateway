ARG node_version
FROM node:${node_version:-20.12.2}

ARG app_root
ARG user
ARG uid
ARG gid
ARG debug
ARG pnpm_version

ENV USER=${user}
ENV UID=${uid}
ENV GID=${gid}
ENV DEBUG=${debug}
ENV APP_ROOT=${app_root}

RUN if [ -n "${debug}" ]; then set -eux; fi && \
    groupmod -g 1111 node && usermod -u 1111 -g 1111 node && \
    groupadd -g ${gid} docker && \
    useradd -m -d /home/${user} -u ${uid} -g docker ${user} && \
    chmod 775 /home/${user} && \
    mkdir ${app_root} && \
    chown -R ${user}:docker /usr/local/lib/node_modules /usr/local/bin && \
    chown ${user}:docker ${app_root}
    
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    if [ -n "${debug}" ]; then set -eux; fi && \
    apt-get update > /dev/null && \
    if [ -z "${debug}" ]; then apt-get -qy upgrade > /dev/null; fi && \
    apt-get -qy install sudo net-tools > /dev/null && \
    echo "${user}\t\tALL=(ALL:ALL)\tNOPASSWD:ALL" | tee --append /etc/sudoers && \
    if [ -z "${debug}" ]; then apt cache clear > /dev/null; fi

WORKDIR ${app_root}
USER ${user}:docker

COPY package.json .
COPY pnpm-lock.yaml .

RUN if [ -n "${debug}" ]; then set -eux; fi && \
    npm install -g npm@latest > /dev/null && \
    corepack enable && \
    pnpm set version ${pnpm_version} && \
    corepack pack && \
    pnpm install --frozen-lockfile

CMD [ "pnpm", "run", "dev" ]
