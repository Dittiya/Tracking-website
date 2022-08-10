import { useEffect, useState } from "react";
import { storeDetections } from "./yolo_utils/postprocess";
import { toTensor, imageData } from "./yolo_utils/preprocess";
import { getConfidence, runPrediction } from "./yolo_utils/modelHelper";
import Statistics from "./components/Statistics";

function History() {
  const [session, setSession] = useState(false);
  const [update, setUpdate] = useState(false);
  const [modelText, setText] = useState('Not Ready');
  const confidence = getConfidence();

  async function loadModel() {
    const path = process.env.PUBLIC_URL + '/best.onnx';
    return await window.ort.InferenceSession.create(path, { executionProviders: ['wasm'] });
  }

  useEffect(() => {
    loadModel().then(res => {
      console.log('Session loaded!');
      setSession(res);
      setText('Predict');
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

  function predict() {
    console.log('Predicting...');

    const dims = [1,3,640,640];
    const imgLoc1 = [0,0], 
          imgLoc2 = [640,0];
    const img = imageData(imgLoc1, dims[2]), 
          img2 = imageData(imgLoc2, dims[2]);
    const tensor = toTensor(img, dims), 
          tensor2 = toTensor(img2, dims);

    runPrediction(session, tensor, tensor2, 2).then((result) => {
      result[1].then((response) => {
        result[0].then((result) => {
          storeDetections(response);
          storeDetections(result);
          setUpdate((prev) => !prev);
        });
      });
    });
  }

  const changeThreshold = (e) => {
    const confidence = e.target.value / 100;
    const label = document.getElementById('conf-value');

    sessionStorage.setItem("confThreshold", confidence);
    label.textContent=confidence;
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
        </div>

        <div className='mt-4 flex flex-row w-max'>
          <span>Confidence</span>
          <div className="grid grid-rows-2 place-items-center">
            <input type="range" min="0" max="100" step="5" defaultValue={confidence*100} className="ml-2" onChange={changeThreshold}></input>
            <span id="conf-value">{confidence}</span>
          </div>
          <div>
            <button id="btn-predict" className={`rounded-lg shrink p-1 font-medium text-slate-900 ml-2 hover:bg-slate-200 ${session ? 'bg-slate-100' : 'bg-slate-500'}`} onClick={predict}>
              {modelText}</button>
          </div>
        </div>

      </div>

      <div className="container m-4">
        <Statistics state={update} />
      </div>
    </div>
  );
}

export default History;
