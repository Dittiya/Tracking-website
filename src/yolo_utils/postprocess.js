export function output(prediction, threshold) {
    const stride = prediction.dims[2] || 0;
    const data = prediction.data;

    if (stride === 0) {
        return 'Wrong size';
    }

    let preds = [];
    for (let i=0; i<prediction.data.length; i+=stride) {
        let box = [];
        // 0,1,2,3 is x,y,w,h
        // 4 is the confidence
        // 5 to stride are classes from 0 to n (n = total classes)
        // x, y is the center of the box while w, h is the size

        const confidence = data[i+4];

        if (confidence > threshold) {
            const x = data[i];
            const y = data[i+1];
            const w = data[i+2];
            const h = data[i+3];
            const predClass = getClass(data.slice(i+5, i+stride), threshold);

            box = [...box, x-0.5*w, y-0.5*h, w, h, confidence, predClass];
            preds = [...preds, box];
            drawBoxes(box);
        }
    }
    nonMaxSuppBox(preds);
}

function getClass(data, threshold) {
    const isClass = (e) => e > threshold;
    return data.findIndex(isClass);
}

function drawBoxes(coord) {
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = "4";
    ctx.strokeStyle = "red";

    let [x, y, w, h, conf, classIdx] = coord;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.fillText(classIdx, x, y);
}

export function nonMaxSuppBox(boxes) {
    console.log(boxes);
}
