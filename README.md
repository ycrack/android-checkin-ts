# android-checkin-ts
[![build](https://github.com/ycrack/android-checkin-ts/actions/workflows/build.yml/badge.svg)](https://github.com/ycrack/android-checkin-ts/actions/workflows/build.yml)

TypeScript port of [mouseos/android-checkin-py](https://github.com/mouseos/android-checkin-py).

## Run
### executable (Deno bundled)
1. Download and unzip latest artifact
2. `./checkin --fingerprint "YOUR_DEVICE_FINGERPRINT" --model "YOUR_DEVICE_MODEL"`

### Build and run
#### Pre-Requisites
- [Deno](https://docs.deno.com/runtime/manual)
- [Buf CLI](https://buf.build/docs/installation)

#### step
1. `git clone https://github.com/ycrack/android-checkin-ts.git`
2. `buf generate`
3. `deno run --allow-net main.ts --fingerprint "YOUR_DEVICE_FINGERPRINT" --model "YOUR_DEVICE_MODEL"`

## Link
[checkin.proto](checkin.proto) is based on the code below:
- [chromium/chromium](https://github.com/chromium/chromium/tree/main/google_apis/gcm/protocol)
- [EEForg/rs-google-play](https://github.com/EFForg/rs-google-play/blob/master/googleplay-protobuf/protos/googleplay.proto)
- [microg/GmsCore](https://github.com/microg/GmsCore/blob/master/play-services-core-proto/src/main/proto/checkin.proto)
