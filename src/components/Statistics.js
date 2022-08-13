import { useEffect, useState } from "react";
import classesJSON from '../yolo_utils/classes.json';
import { Grid } from 'gridjs-react'

function Statistics({ state }) {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    countOps();
  }, [state]);

  function countOps() {
    const storage = JSON.parse(sessionStorage.getItem("detections")) || [];
    console.log('run count...');

    let tempOps = [];
    for (const operator of storage) {
      tempOps[operator] = tempOps[operator] ? tempOps[operator] + 1 : 1;
    }

    let mappedOps = [];
    tempOps.map((count, index) => {
      mappedOps = [...mappedOps, [classesJSON[index]['name'], count]];
    })

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

      {/* Table */}
      <Grid
        columns={['Name', 'Count']}
        data={detections}
        sort={true}
        search={true}
        pagination={{
          enabled: true,
          limit: 5
        }}
      />
    </div>
  );
}

export default Statistics;
