import ModelLoader from './ModelLoader.component';
import { useState } from "react";

function History() {
  const [currentImg, setCurrentImg] = useState();

  const changeImg = (e) => {
    URL.revokeObjectURL(currentImg);

    let src = e.target.files;
    if (src && src.length) {
      setCurrentImg(src[0]);
    }
  }

  return (
    <div className="container m-4">

      {/* display image preview */}
      <div className="container m-4">
        <label htmlFor="image-file" className="mr-4">Upload image</label>
        <input id="image-file" type="file" onChange={changeImg}></input>
        {currentImg && (
          <div className="container w-1/2">
            <label className="text-2xl">Preview Image</label>
            <img src={URL.createObjectURL(currentImg)} alt="alt" />
          </div>
        )}
      </div>

      {/* component to load model */}
      <div className="container m-4">
        {currentImg && (
          <ModelLoader image={URL.createObjectURL(currentImg)} />
        )}
      </div>
    </div>
  );
}

export default History;
