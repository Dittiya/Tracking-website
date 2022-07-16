import { output } from "./yolo_utils/postprocess";
import { toTensor, imageData } from "./yolo_utils/preprocess";

function History() {

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

  async function run(tensor) {
    console.time('inference');
    try {
      const path = process.env.PUBLIC_URL + '/best.onnx'
      const session = await window.ort.InferenceSession.create(path);
      const feeds = { images: tensor };
      const result = await session.run(feeds);
      output(result.output, 0.75);
    } catch (e) {
      console.log(e);
    }
    console.timeEnd('inference');
  }

  const predict = async (e) => {
    console.log('Predicting...');
    const dims = [1,3,640,640];
    let img = imageData(dims[2]);
    const tensor = toTensor(img, dims);
    
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
