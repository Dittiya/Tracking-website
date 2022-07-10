import { useState } from "react";

function History() {
  const [currentImg, setCurrentImg] = useState();

  async function loadModel() {
    const path = process.env.PUBLIC_URL + '/best.onnx'
    const model = await window.ort.InferenceSession.create(path);
    console.log('model loaded!')
    return model
  }

  const model = loadModel();

  const changeImg = (e) => {
    URL.revokeObjectURL(currentImg);

    // change image when loaded
    let src = e.target.files;
    if (src && src.length) {
      setCurrentImg(src[0]);

      // load model 

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
            <img id="image-tag" src={URL.createObjectURL(currentImg)} alt="alt" />
          </div>
        )}
      </div>

      <div className='container  m-4'>

      </div>

    </div>
  );
}

export default History;
