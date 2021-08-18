import React from "react";
import "./PixLoader.css";

const pixCount = 7;
/** src: "/upload/test_00001.jpg" */

function PixLoader() {
  const index = 1;
  return (
    <div className="py-2 mx-2 text-gray-300">
      <div className="text-blue-400 font-extrabold">Galerie photo</div>
      <div>
        <input
          className="m-4 bg-blue-300 text-center text-gray-50 p-2 rounded-lg"
          type="file"
          onChange=""
          name=""
          id=""
        />
      </div>
      <div id="pixGallery">
        {Array(pixCount)
          .fill(1)
          .map((value, index) => (
            <div key={index} id="pixContainer" className={`picture_${index+1} ${index+1 == pixCount ? 'flex-grow' : ''}`}>
              <a href="#">
                <img className={`h-full w-full object-cover`} src={`/upload/test_0000${index + 1}.jpg`} alt="" />{" "}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PixLoader;
