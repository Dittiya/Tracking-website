const tf = require('@tensorflow/tfjs');


function ModelLoader({ image, model }) {

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
    model.then(async function (res) {
      const size = [1024, 1024];
      let inf = tf.browser.fromPixels(image);

      // preprocess
      inf = tf.image.resizeBilinear(inf, size, false);
      inf = inf.cast('int32');
      inf = inf.expandDims(0);

      const prediction = await res.executeAsync(inf);
      console.log(prediction);
    }, function (err) {
      console.log(err);
    })
  }

  return (
    <div className="container">
      <button type="button" onClick={processImg} className="rounded-[12px] p-2 hover:bg-slate-100 hover:text-slate-900">
        Process
      </button>
      <img id="image-tf" className='invisible w-1' alt='temp'/>
    </div>
  );
}

export default ModelLoader;
