#!/usr/bin/env bash
cd src/app/proto
protoc --plugin=../../../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./gtfs-realtime.proto ./nyct-subway.proto
