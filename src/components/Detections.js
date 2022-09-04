import { useEffect, useState } from "react";
import classesJSON from '../yolo_utils/classes.json';

function Detections({ state }) {
  const [detections, setDetection] = useState(JSON.parse(sessionStorage.getItem("detections")));

  useEffect(() => {
    setDetection(JSON.parse(sessionStorage.getItem("detections")));
  }, [state]);

  function reload() {
    let getDets = JSON.parse(sessionStorage.getItem("detections"));
    setDetection(getDets);
  }

  return (
    <div className="container">
      <div className="container flex">
        <h1>Detection Result</h1>
        <button className="ml-4" onClick={reload}>Reload</button>
      </div>
      <div className="container ml-2">
        <ul>
          {detections && detections.map((det, index) => (
            <li key={index}>{index+1}. {classesJSON[det]['name']}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detections;
