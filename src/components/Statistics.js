import { useEffect, useState } from "react";
import classesJSON from '../yolo_utils/classes.json';
import Charts from "./Chart";

function Statistics({ parentState }) {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    countOps();
  }, [parentState]);

  const raritySort = (a, b) => {
    return a[2] - b[2] || a[1].localeCompare(b[1]);
  }

  function countOps() {
    const storage = JSON.parse(localStorage.getItem("detections")) || [];

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

  const filteredOperators = () => {
    const counts = [0,0,0];

    detections.forEach(arr => {
      if (arr[2] === 3) counts[1] += arr[3];
      else if (arr[2] === 4) counts[2] += arr[3];
    });
    counts[0] = counts[1] + counts[2];

    return counts;
  }

  return (
    <div className="container">
      <div id="btn-navbar" className="flex">
        <button className="mr-2">Export</button>
      </div>

      {/* <div id="display-rateup">
        <h1>Next 6 stars in x pulls</h1>
      </div> */}

      <div id="histogram" className="bg-white">
        <Charts data={detections} type="bar" />
      </div>

      <div id="summary">
        <label>Total Pulls: {filteredOperators()[0]}</label> <br />
        <label>Among them you pulled {filteredOperators()[1]} 3* operators</label> <br />
        <label>Among them you pulled {filteredOperators()[2]} 4* operators</label> <br />
      </div>
    </div>
  );
}

export default Statistics;
