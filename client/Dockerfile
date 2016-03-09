FROM node:5.3
MAINTAINER Alces Development "dev@alces-software.com"

ENV USER_ID 1000

# Packages to make working in the Docker container nicer go here.
RUN apt-get update && \
    apt-get -y install \
        tmux

RUN useradd -m -u $USER_ID aviator
USER aviator

ENV HOME /home/aviator
WORKDIR /home/aviator/aviator

RUN npm config set prefix /home/aviator/node_modules

EXPOSE 3001
