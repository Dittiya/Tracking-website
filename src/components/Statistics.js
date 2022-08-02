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

  return (
    <div className="container">
      <div id="btn-navbar" className="flex">
        <button className="mr-2">Operators</button>
        <button className="mr-2">Export</button>
        <button className="mr-2" onClick={reload}>Reload</button>
      </div>
      <div id="display-rateup">
        <h1>Next 6 stars in x pulls</h1>
      </div>

      {/* Table */}
      <div id="display-stats" className="m-2 overflow-x-auto relative">
        <table className="table-auto">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-2 text-left">Operators</th>
              <th className="p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ops.map((val, key) => (
              <tr key={key}>
                <td className="p-2">{classesJSON[key]['name']}</td>
                <td className="p-2 text-center">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistics;
