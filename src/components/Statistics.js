import { useEffect, useState } from "react";
import classesJSON from '../yolo_utils/classes.json';
import { Grid } from 'gridjs-react';
import { h, html } from "gridjs";
import { storeDetections } from "../yolo_utils/postprocess";
import Charts from "./Chart";

function Statistics({ parentState }) {
  const imgUrl = 'https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/';
  const columns = [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'Operators',
      formatter: (cell, row) => html(
        `<center>
          <img style="width: 20%" src="${imgUrl + classesJSON[row.cells[0].data]['actual'] + '.png'}">
          <label>${classesJSON[row.cells[0].data]['name']}</label>
        </center>`
      )
    },
    {
      name: 'Rarity',
      width: '25%',
      attributes: (cell) => {
        if (cell) {
          return {
            'style': 'text-align: center',
          };
        }
      }
    },
    {
      name: 'Count',
      width: '25%',
      attributes: (cell) => {
        if (cell) {
          return {
            'style': 'text-align: center',
          };
        }
      }
    },
    {
      name: 'Actions',
      attributes: (cell) => {
        if (cell) {
          return {
            'style': 'text-align: center',
          };
        }
      },
      formatter: (cell, row) => {
        const add = h('button', {
          className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
          onClick: () => {
            storeDetections([row.cells[0].data]);
            setState(!state);
          }
        }, '+');

        const reduce = h('button', {
          className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
          onClick: () => alert(`Reducing 1 of ${row.cells[0].data}`)
        }, '-');

        return [add, reduce];
      }
    }
  ];

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

    let mappedOps = [];
    tempOps.map((count, index) => {
      mappedOps = [
        ...mappedOps, 
        [
          index.toString(),
          classesJSON[index]['name'], 
          classesJSON[index]['rarity'], 
          count, 
          'temp'
        ]
      ];
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

      {/* Table */}
      <div className="container flex">
        <Grid
          columns={columns}
          data={detections}
          sort={true}
          search={true}
          width={'1000px'}
          pagination={{
            enabled: true,
            limit: 5
          }}
        />
      </div>

      <div id="histogram" className="bg-white">
        <Charts data={detections} type="bar" />
      </div>
    </div>
  );
}

export default Statistics;
