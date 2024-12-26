"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.css";

const Navbar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>AI Vision</div>
    <ul className={styles.navLinks}>
      <li>
        <a href="#home">Home</a>
      </li>
      <li>
        <a href="#features">Features</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
    </ul>
  </nav>
);

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1>Real-Time Object Detection Dashboard</h1>
    <p>Experience real-time object detection with AI technology</p>
  </header>
);

const ObjectDetection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    setIsLoading(true);
    socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsLoading(false);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsLoading(true);
    };

    socketRef.current.onmessage = (event) => {
      if (typeof event.data === "string") {
        const metadata = JSON.parse(event.data);
        if (canvasRef.current) {
          canvasRef.current.width = metadata.width;
          canvasRef.current.height = metadata.height;
        }
      } else if (event.data instanceof Blob) {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              ctx.drawImage(
                img,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
            }
          }
        };
        img.src = URL.createObjectURL(event.data);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
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
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectDetection;
