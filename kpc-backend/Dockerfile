# syntax=docker/dockerfile:1
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

# Copy app source code
WORKDIR /app
COPY . .

# Create symlink to set UTC timezone
RUN ln -fs /usr/share/zoneinfo/UTC /etc/localtime

# Install OS level dependencies
RUN yes | apt-get update \
    && apt-get install -y \
      locales \
      locales-all \
      tzdata \
      gcc \
      g++ \
      autoconf \
      automake \
      bison \
      libc6-dev \
      libffi-dev \
      libgdbm-dev \
      libgd-dev \
      libssl-dev \
      libyaml-dev \
      libreadline-dev \
      libgdbm-dev \
      libdbm-deep-perl \
      libncurses5-dev \
      libxrender-dev \
      libonig5 \
      libonig-dev \
      libjpeg-dev \
      libpng-dev \
      libxext6 \
      libxext-dev \
      libx11-6 \
      libgl1-mesa-dev \
      build-essential \
      ca-certificates \
      openssl \
      nodejs \
      npm \
      cron \
      zip \
      unzip \
      file \
      curl \
      xdotool \
      poppler-utils \
      wget \
      vim \
      ttf-mscorefonts-installer \
      fontconfig \
      gdebi \
      python2 \
      python3 \
      python3-pip \
      python3-venv \
      python3-dotenv \
      nginx \
      tar \
      gzip \
      gnupg 

# Set default locale
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Install Keyphrase Curation dependencies
RUN pip install -r requirements.txt

# Install Keyphrase Curation Tool
RUN python3 install.py -a