import { useEffect, useState } from "react";

function Detections() {
  const [detections, setDetection] = useState(null);

  useEffect(() => {
    let getter = JSON.parse(sessionStorage.getItem("detections")) || null;
    setDetection(getter);
  }, []);

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
      <div className="container">
        <h1>Result</h1>
        <ul>
          {detections && detections.map((detection, index) => (
            <li key={index}>{detection}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detections;
