import React, { useRef, useState } from "react";
import images from "./assests/images";
import "./Magnify.css";
const Magnify = () => {
  //   console.log(images);
  const [image, setImage] = useState("");
  const [[cruserX, cruserY], setCruser] = useState([[0, 0]]);
  const [[pictureHeight, pictureWidth], setPictureArea] = useState([[0, 0]]);
  const [[eleOffsetX, eleOffsetY], seteleOffset] = useState([[0, 0]]);
  const lensRef = useRef();
  const zoomRef = useRef();

  const mouseMoveHandler = (e) => {
    console.log(e);
    const ele = e.currentTarget;
    console.log(ele);
    const { top, left, height, width } = ele.getBoundingClientRect();
    setPictureArea([height, width]);
    console.log(top, left);
    console.log("lens", { lensRef });
    const x = e.pageX - left - lensRef.current.offsetWidth / 2;
    const y = e.pageY - top - lensRef.current.offsetHeight / 2;
    setCruser([x, y]);

    const cx = zoomRef.current.offsetWidth / lensRef.current.offsetWidth;
    const cy = zoomRef.current.offsetHeight / lensRef.current.offsetHeight;
    seteleOffset([cx, cy]);
    console.log(cx, cy);
  };

  return (
    <>
      <div className="container">
        <div className="pictures">
          {images.map((img) => (
            <img
              src={img}
              alt="pictur"
              style={{ width: "70px", height: "100px" }}
              onMouseOver={() => {
                setImage(img);
                console.log(img);
              }}
            />
          ))}
        </div>
        <div className="picture">
          {image && (
            <div>
              <img
                src={image}
                style={{ width: "550px", height: "550px" }}
                alt=""
                onMouseMove={(e) => {
                  mouseMoveHandler(e);
                }}
              />
            </div>
          )}
          <div
            className="magnifier_lens"
            style={{ top: `${cruserY}px`, left: `${cruserX}px` }}
            ref={lensRef}
            // onMouseMove={(e)=>{mouseMoveHandler(e)}}
          ></div>
        </div>
        <div
          className="zoom"
          ref={zoomRef}
          style={{
            height: "500px",
            width: "500px",
            border: "1px solid black",
            background: `url(${image})`,
            backgroundPosition: `-${cruserX * eleOffsetX}px -${
              cruserY * eleOffsetY
            }px`,
            backgroundSize: `${pictureWidth * eleOffsetX}px ${
              pictureHeight * eleOffsetY
            }px`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </>
  );
};

export default Magnify;
