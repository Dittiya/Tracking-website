import { output } from "./postprocess";

export function getConfidence() {
  const confidence = parseFloat(localStorage.getItem("confThreshold")) || 0.75;
  return confidence;
}

export async function runPrediction(session, tensor, tensor2, imgN) {
  const start = new Date();
  const threshold = getConfidence();
  let out;
  let out2;

  const feeds = { images: tensor };
  const result = await session.run(feeds);
  out = output(result.output, threshold);

  const feeds2 = { images: tensor2 };
  const result2 = await session.run(feeds2);
  out2 = output(result2.output, threshold, imgN);

  const end = new Date();
  const inferTime = end.getTime() - start.getTime();
  console.log('Inference time: ' + inferTime + ' ms');

  return [out, out2];
}