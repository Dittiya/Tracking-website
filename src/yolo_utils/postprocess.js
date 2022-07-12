export function output(prediction) {
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
        box = [...box, data[i], data[i+1], data[i+2], data[i+3]];
        let confidence = data[i+4];

        if (confidence > 0.75) {
            preds = [...preds, box];
            drawBoxes(box)
        }
    }

}

// x, y center of the box while w, h is the size
function drawBoxes(coord) {
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = "4";
    ctx.strokeStyle = "red";

    let [x, y, w, h] = coord;

    ctx.beginPath();
    ctx.rect(x - 0.5*w,
        y - 0.5*h,
        w,
        h);
    ctx.stroke();
}

export function nms(data) {

}
