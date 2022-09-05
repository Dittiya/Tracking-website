import { useEffect, useState } from "react";
import classesJSON from '../yolo_utils/classes.json';
import Charts from "./Chart";

function Statistics({ parentState }) {
  const [detections, setDetections] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    countOps();
  }, [parentState, state]);

  const raritySort = (a, b) => {
    return a[2] - b[2] || a[1].localeCompare(b[1]);
  }

  function countOps() {
    const storage = JSON.parse(sessionStorage.getItem("detections")) || [];

    let tempOps = [];
    for (const operator of storage) {
      tempOps[operator] = tempOps[operator] ? tempOps[operator] + 1 : 1;
    }

    const mappedOps = [];
    tempOps.map((count, index) => {
      mappedOps.push([
        index,
        classesJSON[index]['name'],
        classesJSON[index]['rarity'],
        count
      ]);
    })
    mappedOps.sort(raritySort);
    setDetections(mappedOps);

    return mappedOps;
  }

  return (
    <div className="container">
      <div id="btn-navbar" className="flex">
        <button className="mr-2">Operators</button>
        <button className="mr-2">Export</button>
      </div>
      <div id="display-rateup">
        <h1>Next 6 stars in x pulls</h1>
      </div>

      <div id="histogram" className="bg-white">
        <Charts data={detections} type="bar" />
      </div>
    </div>
  );
}

export default Statistics;
