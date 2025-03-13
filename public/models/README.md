
# Face API Models Directory

This application uses face-api.js models for face detection, landmark detection, and recognition.

The application now loads the models directly from a CDN, so you don't need to manually download them.

If you want to use local models instead of the CDN, you can download them from:
https://github.com/vladmandic/face-api/tree/master/model

Required models:
- tiny_face_detector_model-weights_manifest.json
- tiny_face_detector_model-shard1
- face_landmark_68_model-weights_manifest.json
- face_landmark_68_model-shard1
- face_recognition_model-weights_manifest.json
- face_recognition_model-shard1
- face_recognition_model-shard2

After downloading, place these files in this directory and update the MODEL_URL in src/services/faceDetectionService.ts to use '/models' instead of the CDN URL.
