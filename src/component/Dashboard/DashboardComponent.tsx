"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "../../utilities/render-predictions";
import styles from "./Dashboard.module.css";

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
      {isLoading ? (
        <div>Loading AI Model...</div>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            className={styles.webcam}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
            muted
          />
          <canvas ref={canvasRef} className={styles.canvas} />
        </>
      )}
    </div>
  );
};

export default ObjectDetection;
