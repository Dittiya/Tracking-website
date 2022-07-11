import { useState } from "react";

function History() {
  const [currentImg, setCurrentImg] = useState();

  function handleCanvas(e) {
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = (event) => {
      let img = new Image();
      img.src = event.target.result;
      img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
      }
    }
    reader.readAsDataURL(e);
  }

  const changeImg = (e) => {
    // change image when loaded
    let src = e.target.files;
    if (src && src.length) {
      handleCanvas(src[0]);
    }
  }

  function getImageData(width) {
    const canvas = document.getElementById('image-canvas');
    const ctx = canvas.getContext('2d');

    return ctx.getImageData(0,0,width,width).data;
  }

  function imageDataToTensor(data, dims) {
    const [R, G, B] = [[], [], []];
    for (let i=0; i<data.length; i+=4) {
      R.push(data[i]);
      G.push(data[i+1]);
      B.push(data[i+2]);
    }

    const transposed = R.concat(G).concat(B);
    let i, l = transposed.length;
    const float32Arr = new Float32Array(3*640*640);
    for (i=0; i<l; i++) {
      float32Arr[i] = transposed[i] / 255.0;
    }
    const inputTensor = new window.ort.Tensor('float32', float32Arr, dims);
    return inputTensor;
  }

  async function run(tensor) {
    try {
      const path = process.env.PUBLIC_URL + '/best.onnx'
      const session = await window.ort.InferenceSession.create(path);
      const feeds = { images: tensor };
      const result = await session.run(feeds);

      console.log('Prediction: ');
      console.log(result.output);
    } catch (e) {
      console.log(e);
    }
  }

  const predict = async (e) => {
    console.log('Predicting...');
    const dims = [1,3,640,640];
    let img = getImageData(640);
    const tensor = imageDataToTensor(img, dims);
    
    run(tensor);
  }

  return (
    <div className="container m-4">

      {/* display image preview */}
      <div className="container m-4">
        <label htmlFor="image-file" className="mr-4">Upload image</label>
        <input id="image-file" type="file" onChange={changeImg}></input>
        <div className="flex flex-row">

          <div className="w-auto">
            <h1 className="text-2xl">Preview Image</h1>
            <canvas id="image-canvas"></canvas>
          </div>

          <div className='container m-4'>
            <button id="btn-predict" className="rounded-full" onClick={predict}>Predict</button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default History;
