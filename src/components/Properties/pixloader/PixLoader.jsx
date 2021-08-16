import React from "react";
import Gallery from "react-photo-gallery";

const Photos = [
    {
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 1,
        height: 1
      },
      {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/PpOHJezOalU/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/XiDA78wAZVw/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/x8xJpClTvR0/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/qGQNmBE7mYw/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/NuO6iTBkHxE/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/pF1ug8ysTtY/600x400",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/A-fubu9QJxE/800x533",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/5P91SF0zNsI/740x494",
        width: 4,
        height: 3
      }
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
      <div id="pixGallery" className="w-full">
        <Gallery photos={Photos} direction={"row"} />
      </div>
    </div>
  );
}

export default PixLoader;
