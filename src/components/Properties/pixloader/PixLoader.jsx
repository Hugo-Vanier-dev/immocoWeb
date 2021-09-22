import React from "react";
import "./PixLoader.css";

const pixCount = 7;
/** src: "/upload/test_00001.jpg" */

function PixLoader() {
  const index = 1;
  return (
    <div className="text-gray-300">
      <div className="text-blue-300 font-black mx-2 py-2">Galerie photo</div>
      <div>
        <input
          className="my-2 w-full mx-auto bg-blue-300 text-center text-gray-50 p-2 rounded-lg"
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
                <img className={`h-40 w-full my-1 object-cover`} src={`/upload/test_0000${index + 1}.jpg`} alt="" />{" "}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PixLoader;
