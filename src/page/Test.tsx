import { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const WebcamCapture = () => {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  /**
   * Runs the Coco SSD object detection model.
   *
   * @return {Promise<void>} Returns a promise that resolves when the function completes.
   */
  const runCoco = async (): Promise<void> => {
    const net = await cocoSsd.load();
    console.log("model loaded");

    setInterval(() => {
      detect(net);
    }, 10);
  };

  /**
   * Detects objects in a video using the given object detection model.
   *
   * @param {cocoSsd.ObjectDetection} net - The object detection model to use.
   * @return {Promise<void>} A Promise that resolves when the object detection is complete.
   */
  const detect = async (net: cocoSsd.ObjectDetection): Promise<void> => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  /**
   * Draws rectangles on a canvas based on the given detections.
   *
   * @param {any[]} detections - an array of detection objects
   * @param {object} ctx - the canvas context object
   * @param {function} ctx.beginPath - begins a new path
   * @param {function} ctx.rect - draws a rectangle
   * @param {number} ctx.lineWidth - the width of the line
   * @param {string} ctx.strokeStyle - the color of the line
   * @param {string} ctx.fillStyle - the color to fill the rectangle
   * @param {function} ctx.stroke - strokes the current path
   * @param {function} ctx.fillText - fills text at the specified location
   * @return {void}
   */
  const drawRect = (
    detections: any[],
    ctx: {
      beginPath: () => void;
      rect: (arg0: any, arg1: any, arg2: any, arg3: any) => void;
      lineWidth: number;
      strokeStyle: string;
      fillStyle: string;
      stroke: () => void;
      fillText: (arg0: string, arg1: any, arg2: number) => void;
    }
  ) => {
    detections.forEach((prediction) => {

      console.log(prediction);
      ctx.beginPath();
      ctx.rect(
        prediction["bbox"][0],
        prediction["bbox"][1],
        prediction["bbox"][2],
        prediction["bbox"][3]
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.stroke();
      ctx.fillText(
        `${prediction["class"]} - ${Math.round(prediction["score"] * 100)}%`,
        prediction["bbox"][0],
        prediction["bbox"][1] > 10 ? prediction["bbox"][1] - 5 : 10
      );
    });
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 999,
          width: 640,
          height: 480,
        }}
      />
    </>
  );
};

export default WebcamCapture;
