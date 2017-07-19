#!/bin/bash
set -e

git clone https://github.com/facebook/watchman.git $WATCHMAN_PATH
pushd $WATCHMAN_PATH
git checkout v4.7.0
./autogen.sh && ./configure && make && sudo make install
popd
