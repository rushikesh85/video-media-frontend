// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
// import * as tf from "@tensorflow/tfjs";
// import { renderPredictions } from "../../utilities/render-predictions";
// import styles from "./Dashboard.module.css";

// const ObjectDetection: React.FC = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const webcamRef = useRef<Webcam | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   async function runCoco() {
//     await tf.setBackend("webgl");
//     setIsLoading(true);
//     const net = await cocoSSDLoad();
//     setIsLoading(false);

//     setInterval(() => {
//       if (canvasRef.current && webcamRef.current?.video?.readyState === 4) {
//         const video = webcamRef.current.video;

//         // Match canvas size to video size
//         canvasRef.current.width = video.videoWidth;
//         canvasRef.current.height = video.videoHeight;

//         // Get canvas context and run detection
//         const ctx = canvasRef.current.getContext("2d");
//         if (ctx) {
//           net.detect(video).then((detections) => {
//             renderPredictions(detections, ctx);
//           });
//         }
//       }
//     }, 100);
//   }

//   useEffect(() => {
//     runCoco();
//   }, []);

//   return (
//     <div className={styles.container}>
//       {isLoading ? (
//         <div>Loading AI Model...</div>
//       ) : (
//         <>
//           <Webcam
//             ref={webcamRef}
//             className={styles.webcam}
//             videoConstraints={{
//               width: 1280,
//               height: 720,
//               facingMode: "user",
//             }}
//             muted
//           />
//           <canvas ref={canvasRef} className={styles.canvas} />
//         </>
//       )}
//     </div>
//   );
// };

// export default ObjectDetection;

"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "../../utilities/render-predictions";
import styles from "./Dashboard.module.css";

const Navbar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>AI Vision</div>
    <ul className={styles.navLinks}>
      <li><a href="#home">Home</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
);

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1>Object Detection Dashboard</h1>
    <p>Experience real-time object detection with AI technology</p>
  </header>
);

const ObjectDetection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function runCoco() {
    await tf.setBackend("webgl");
    setIsLoading(true);
    const net = await cocoSSDLoad();
    setIsLoading(false);

    setInterval(() => {
      if (canvasRef.current && webcamRef.current?.video?.readyState === 4) {
        const video = webcamRef.current.video;

        // Match canvas size to video size
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;

        // Get canvas context and run detection
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          net.detect(video).then((detections) => {
            renderPredictions(detections, ctx);
          });
        }
      }
    }, 100);
  }

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <Header />
      <div className={styles.card}>
        {isLoading ? (
          <div>Loading AI Model...</div>
        ) : (
          <div className={styles.videoWrapper}>
            <Webcam
              ref={webcamRef}
              className={styles.webcam}
              videoConstraints={{
                width: 500,
                height: 500,
                facingMode: "user",
              }}
              muted
            />
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectDetection;
