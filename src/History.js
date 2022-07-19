import { output } from "./yolo_utils/postprocess";
import { toTensor, imageData } from "./yolo_utils/preprocess";

async function loadModel() {
  const path = process.env.PUBLIC_URL + '/best.onnx'
  return await window.ort.InferenceSession.create(path, {executionProviders: ['wasm']});
}

let session;
loadModel().then(res => {
  session = res;
});

function History() {

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

  async function run(tensor, imgN) {
    const start = new Date();
    const threshold = 0.75;

    try {
      const feeds = { images: tensor };
      const result = await session.run(feeds);
      output(result.output, threshold, imgN);
    } catch (e) {
      console.log(e);
    }

    const end = new Date();
    const inferTime = end.getTime() - start.getTime();
    console.log('Inference time: ' + inferTime);
  }

  const predict = async (e) => {
    console.log('Predicting...');

    const dims = [1,3,640,640];
    const imgLoc1 = [0,0], 
          imgLoc2 = [640,0];
    const img = imageData(imgLoc1, dims[2]), 
          img2 = imageData(imgLoc2, dims[2]);
    const tensor = toTensor(img, dims), 
          tensor2 = toTensor(img2, dims);

    console.log('1st prediction');
    run(tensor);
    console.log('2nd prediction');
    run(tensor2, 2);
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
