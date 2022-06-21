import ModelLoader from './ModelLoader.component';
import { useState } from "react";
const tf = require('@tensorflow/tfjs');

async function loadModel() {
  const model = await tf.loadGraphModel("https://raw.githubusercontent.com/Dittiya/Tracking-website/od-integration/ak_web_model/model.json");
  console.log('Model loaded!');
  return model
}

function History() {
  const [currentImg, setCurrentImg] = useState();
  const model = loadModel();

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
          <ModelLoader image={URL.createObjectURL(currentImg)} model={model} />
        )}
      </div>
    </div>
  );
}

export default History;
