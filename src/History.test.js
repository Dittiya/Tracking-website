// jsfiddle code
// 

function loadImage() {
	const imageUrl = 'https://raw.githubusercontent.com/Dittiya/Tracking-website/od-integration/src/assets/pull_1.jpg';
  let imgBlob;
  
  fetch(imageUrl).then();
  
  return imgBlob;
}

async function loadModel() {
  const url = "https://raw.githubusercontent.com/Dittiya/Tracking-website/od-integration/ak_web_model/model.json"
  const model = await tf.loadGraphModel(url);
  return model
}

const model = loadModel();

model.then(async function(model) {
	const imageUrl = 'https://raw.githubusercontent.com/Dittiya/Tracking-website/od-integration/src/assets/pull_1.jpg';
  const img = document.getElementById('image1');
  const reader = new FileReader();
  console.log('Model loaded!');

  let blob = await fetch(imageUrl).then(res => res.blob());
  
  reader.readAsDataURL(blob);
  reader.onload = function(event) {
  	const dataUrl = event.target.result;
    let imageEle = new Image();
    imageEle.src = dataUrl;
    imageEle.onload = async function() {
    	img.setAttribute('src', this.src);
      img.setAttribute('height', this.height);
      img.setAttribute('width', this.width);
      
      let inf = tf.browser.fromPixels(img);
      inf = tf.image.resizeBilinear(inf, [1024, 1024], false);
      inf = inf.cast('int32');
      inf = inf.expandDims(0);
      
      const prediction = await model.executeAsync(inf);
      console.log(prediction);
    }
  }
}); 