#!/bin/bash
set -e

git clone https://github.com/facebook/watchman.git ~/facebook/watchman
pushd ~/facebook/watchman
git checkout v4.7.0
./autogen.sh && ./configure && make && sudo make install
popd
