export function toTensor(data, dims) {
    const [R, G, B] = [[], [], []];
    for (let i=0; i<data.length; i+=4) {
      R.push(data[i]);
      G.push(data[i+1]);
      B.push(data[i+2]);
    }

    const transposed = R.concat(G).concat(B);
    let i, l = transposed.length;
    const float32Arr = new Float32Array(3*dims[2]*dims[2]);
    for (i=0; i<l; i++) {
      float32Arr[i] = transposed[i] / 255.0;
    }
    const inputTensor = new window.ort.Tensor('float32', float32Arr, dims);
    return inputTensor;
}

export function imageData(width) {
    const canvas = document.getElementById('image-canvas');
    const ctx = canvas.getContext('2d');

    return ctx.getImageData(0,0,width,width).data;
}
