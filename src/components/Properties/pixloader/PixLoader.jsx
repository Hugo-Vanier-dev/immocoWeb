import React from "react";
import Gallery from "react-photo-gallery";

import  "./PixLoader.css";

const Photos = [
    {
        src: "/upload/test_00001.jpg",
        width: 3,
        height: 4
      },
      {
          src: "/upload/test_00002.jpg",
          width: 3,
          height: 4
        },
        {
            src: "/upload/test_00003.jpg",
            width: 3,
            height: 4
          },
          {
              src: "/upload/test_00004.jpg",
              width: 3,
              height: 4
            },
            {
                src: "/upload/test_00005.jpg",
                width: 3,
                height: 4
              },
              {
                  src: "/upload/test_00006.jpg",
                  width: 3,
                  height: 4
                },
                {
                    src: "/upload/test_00007.jpg",
                    width: 3,
                    height: 4
                  },
                  {
                      src: "/upload/test_00008.jpg",
                      width: 3,
                      height: 4
                    },
];

function PixLoader() {

  return (
    <div className="py-2 mx-2 text-gray-300">
      <div className="text-blue-400 font-extrabold">
        Galerie photo
      </div>
      <div>
        <input
          className="m-4 bg-blue-300 text-center text-gray-50 p-2 rounded-lg"
          type="file"
          onChange=""
          name=""
          id=""
        />
      </div>
      <div id="pixGallery" className="">
        <Gallery className="galleryComponents" photos={Photos} direction={"row"} />
      </div>
    </div>
  );
}

export default PixLoader;
