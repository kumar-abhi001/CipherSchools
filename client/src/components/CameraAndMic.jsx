import React, { useState, useEffect, useRef } from "react";

const CameraAndMic = ({ setStreamStarted }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);

  const constraints = {
    audio: true,
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
    },
  };

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setVideoDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    requestPermissions();
  }, []);

  const handleStream = (stream) => {
    setStreamStarted(true);
    setPermissionGranted(true);
    videoRef.current.srcObject = stream;
  };

  return (
    <div className="camera-component">
      {permissionGranted && <video
        ref={videoRef}
        autoPlay
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          width: "200px",
          height: "150px",
          zIndex: "1000",
          border: "2px solid #000",
          backgroundColor: "#000",
        }}
      />}
    </div>
  );
};

export default CameraAndMic;
