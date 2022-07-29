import { useEffect, useState } from "react";
import classesJSON from '../yolo_utils/classes.json';

function Statistics({ state }) {
  const [detections, setDetection] = useState(JSON.parse(sessionStorage.getItem("detections")));
  const [ops, setOps] = useState([]);

  useEffect(() => {
    setDetection(JSON.parse(sessionStorage.getItem("detections")));
  }, [state]);

  useEffect(() => {
    countOps();
  }, [detections]);

  function reload() {
    let getDets = JSON.parse(sessionStorage.getItem("detections"));
    setDetection(getDets);
  }

  function countOps() {
    if (!detections) return;

    let tempOps = [];
    for (const operator of detections) {
      tempOps[operator] = tempOps[operator] ? tempOps[operator] + 1 : 1;
    }
    setOps(tempOps);
  }

  function bar() {
    console.log(ops);
  }

  return (
    <div className="container">
      <div id="btn-navbar" className="flex">
        <button className="mr-2" onClick={countOps}>Count Operators</button>
        <button className="mr-2">6 Stars Rate-up</button>
        <button className="mr-2" onClick={reload}>Reload</button>
      </div>
      <div id="display-stats">
        <h1>Display here</h1>
        {ops.map((val, key) => (<h1 key={key}>{classesJSON[key]['name']} x {val}</h1>))}
      </div>
    </div>
  );
}

export default Statistics;
