const tf = require('@tensorflow/tfjs');

async function loadModel() {
  const modelUrl = "https://raw.githubusercontent.com/Dittiya/Tracking-website/od-integration/ak_web_model_lite/model.json";
  const model = await tf.loadGraphModel(modelUrl);
  console.log('Model loaded!');
  return model
}

function ModelLoader({ image }) {
  const model = loadModel();

  async function processImg() {
    const imageTag = document.getElementById("image-tf");
    const reader = new FileReader();
    let blob = await fetch(image).then(r => r.blob());
    
    reader.readAsDataURL(blob);

    reader.onload = function(event) {
      const dataUrl = event.target.result;

      let imageElement = new Image();
      imageElement.src = dataUrl;

      imageElement.onload = function() {
        imageTag.setAttribute("src", this.src);
        imageTag.setAttribute("height", this.height);
        imageTag.setAttribute("width", this.width);

        runPrediction(imageTag);
      }
    }
  }

  function runPrediction(image) {
    model.then(async function (model) {
      // const size = [640, 640];
      let inf = tf.browser.fromPixels(image);

      // preprocess
      // inf = tf.image.resizeBilinear(inf, size, false);
      // inf = inf.cast('int32');
      inf = inf.expandDims(0);

      console.log(model.outputNodes);
      await model.executeAsync(inf).then(response => {
        interpretation(response);
      });
    }, function (err) {
      console.log(err);
    })
  }

  function interpretation(predictions) {
    console.log(predictions);
    console.log('DEBUG: ');
    
    // log all tensors
    for(let i=0; i<predictions.length; i++) {
      console.log('Tensor ' + i + ':');
      let foo = [];
      let tensor = predictions[i].dataSync();
      for(let j=0; j<30; j++) {
        foo.push(tensor[j]);
      }
      console.log(foo);
    }

    console.log('TEST');
    // find tensor for 'detection_scores'
    console.log('Tensor 3 as scores');
    const scores = predictions[3].dataSync();
    let indices = [];
    for(let i=0; i<scores.length; i++) {
      if(indices.length === 10) break
      if(scores[i] > 0.9) indices.push(i);
    }
    console.log(indices);

    // find tensor for 'detection_classes'
    console.log('Tensor 0 as classes');
    const classes = predictions[0].dataSync();
    let pc = [];
    indices.forEach(e => pc.push(classes[e]));
    console.log(pc);
  }

  return (
    <div className="container">
      <button type="button" onClick={processImg} className="rounded-[12px] p-2 hover:bg-slate-100 hover:text-slate-900">
        Process
      </button>
      <img id="image-tf" className='w-1/4 h-1/4' alt='temp'/>
    </div>
  );
}

export default ModelLoader;
