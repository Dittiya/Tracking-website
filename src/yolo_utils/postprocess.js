import classesJSON from './classes.json';

export function output(prediction, threshold, imgN) {
    const start = new Date();
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
            const [predClass, predConf] = getClass(data.slice(i+5, i+stride));

            if (predClass === -1) break;

            box = [...box, x-0.5*w, y-0.5*h, w, h, predConf, predClass];
            preds = [...preds, box];
        }
    }
    
    const end = new Date();
    const nmsTime = end.getTime() - start.getTime();
    console.log('NMS time: ' + nmsTime + ' ms');

    return nonMaxSuppBox(preds, imgN);
}

// function getClass(data, threshold) {
//     const isClass = (e) => e > threshold;
//     return data.findIndex(isClass);
// }

function getClass(data) {
    const max = Math.max(...data);
    return [data.indexOf(max), max];
}

function drawBoxes(coord, imgN) {
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";

    let [x, y, w, h, conf, classIdx] = coord;

    w = w-x;
    h = h-y;
    if (imgN === 2) x += 640;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();

    ctx.font = "normal 600 18px Unknown, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(conf.toFixed(2), x, y-2);
    ctx.fillText(classesJSON[classIdx]['name'], x+40, y-2);
}

async function nonMaxSuppBox(predictions, imgN) {
    let [classes, boxes, scores] = separateBoxes(predictions);

    // transform boxes from xywh to x1y1x2y2
    for (let i=0; i<boxes.length; i++) {
        for (let j=0; j<boxes[i].length; j++) {
            boxes[i][j][2] = boxes[i][j][0] + boxes[i][j][2];
            boxes[i][j][3] = boxes[i][j][1] + boxes[i][j][3];
        }
    }

    let detections = [];
    for (let i=0; i<classes.length; i++) {
        const result = await window.tf.image.nonMaxSuppressionAsync(boxes[i], scores[i], 10, 0.5, 0.1);
        const resultNMS = result.dataSync();
        for (let j=0; j<resultNMS.length; j++) {
            let boxNMS = boxes[i][resultNMS[j]];
            boxNMS = [...boxNMS, scores[i][resultNMS[j]], classes[i]];
            drawBoxes(boxNMS, imgN);
            detections.push(classes[i]);
        }
    }

    
    return detections;
}

function separateBoxes(boxes) {
    let classIndices = [];
    let sortedBoxes = [];
    let sortedScores = [];
    
    for (let i=0; i<boxes.length; i++) {
        const classLabel = boxes[i][5];
        let idx = classIndices.findIndex(e => e === classLabel);
        if ( idx === -1) {
            classIndices.push(classLabel);
            sortedBoxes.push([]);
            sortedScores.push([]);
            idx = classIndices.length-1;
        }
        sortedBoxes[idx].push(boxes[i].slice(0, 4));
        sortedScores[idx].push(boxes[i][4]);
    }

    return [classIndices, sortedBoxes, sortedScores];
}

export function storeDetections(detections) {
    let getter = JSON.parse(sessionStorage.getItem("detections"));
    if (getter === null) {
        sessionStorage.setItem("detections", JSON.stringify(detections));
        return;
    }

    for (let i=0; i<detections.length; i++) {
        getter.push(detections[i]);
    }

    sessionStorage.setItem("detections", JSON.stringify(getter));
    return;
}
