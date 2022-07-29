import { useEffect, useState } from "react";
import { output, storeDetections } from "./yolo_utils/postprocess";
import { toTensor, imageData } from "./yolo_utils/preprocess";
import Detections from "./components/Detections";
import Statistics from "./components/Statistics";

function History() {
  const [session, setSession] = useState(false);
  const [update, setUpdate] = useState(false);

  async function loadModel() {
    const path = process.env.PUBLIC_URL + '/best.onnx';
    return await window.ort.InferenceSession.create(path, { executionProviders: ['wasm'] });
  }

  useEffect(() => {
    loadModel().then(res => {
      console.log('Session loaded!');
      setSession(res);
    });
  }, []);

  function handleCanvas(e) {
    const imgSize = [1280, 640];
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = (event) => {
      let img = new Image();
      img.src = event.target.result;
      img.onload = () => {
          canvas.width = imgSize[0];
          canvas.height = imgSize[1];
          ctx.drawImage(img, 0, 0, imgSize[0], imgSize[1]);
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

  async function run(tensor, tensor2, imgN) {
    const start = new Date();
    const threshold = 0.75;
    let out;
    let out2;

    const feeds = { images: tensor };
    const result = await session.run(feeds);
    out = output(result.output, threshold);

    const feeds2 = { images: tensor2 };
    const result2 = await session.run(feeds2);
    out2 = output(result2.output, threshold, imgN);

    const end = new Date();
    const inferTime = end.getTime() - start.getTime();
    console.log('Inference time: ' + inferTime + ' ms');

    return [out, out2];
  }

  function predict() {
    console.log('Predicting...');

    const dims = [1,3,640,640];
    const imgLoc1 = [0,0], 
          imgLoc2 = [640,0];
    const img = imageData(imgLoc1, dims[2]), 
          img2 = imageData(imgLoc2, dims[2]);
    const tensor = toTensor(img, dims), 
          tensor2 = toTensor(img2, dims);

    run(tensor, tensor2, 2).then((result) => {
      result[1].then((response) => {
        result[0].then((result) => {
          storeDetections(response);
          storeDetections(result);
          setUpdate((prev) => !prev);
        });
      });
    });

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
            <button id="btn-predict" className={`${session ? '' : 'invisible'}`} onClick={predict}>Predict</button>
          </div>
        </div>

      </div>

      <div className="container m-4">
        <Detections state={update} />
      </div>

      <div className="container m-4">
        <Statistics state={update} />
      </div>
    </div>
  );
}

export default History;
