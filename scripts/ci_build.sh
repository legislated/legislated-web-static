#!/bin/bash
set -e

if [ $TRAVIS_BRANCH == 'production' ]; then
  yarn build:prod
else
  yarn build:staging
fi
