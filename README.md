# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Done

- Integrated object detection API using ONNX.
- Show bounding box results in canvas.
- Transform image from 1280x720 to 2x640x640.
- Using Yolov5s to reduce inference and load time.
- Detecting 3*, 4* operators.

## Todos

- Do something with the FE experience.
- Tracking pull history with computer vision (Manually & uploading screenshots).
- Add 5 stars operators.
- Add 6 stars operators (Need more pulls).
- Reduce inference time using WASM, should probably create switch between WASM and WEBGL. Current inference time is ~5 seconds/image depending of the machine's cpu power. (WEBGL currently have issue with Yolov5 and ONNX runtime-web)
- Get better table (or not).
- Calculate certs earnings per pull.

## Credits
- Kion-kun for the [icon](https://twitter.com/kionkun1/status/1232194826919018499).
- Aceship's Toolbox team for the [extensive repo](https://github.com/Aceship/AN-EN-Tags)