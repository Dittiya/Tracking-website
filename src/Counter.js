import { useState } from "react";
import DateTable from "./DateTable"

function Counter() {
  const [orundums] = useState(parseInt(localStorage.getItem("orundums")) || 0);
  const [prime] = useState(parseInt(localStorage.getItem("oriPrime")) || 0);
  const [pulls, setPulls] = useState(() => { 
    return parseInt((orundums + prime * 180) / 600); 
  });

  const countOrundums = (e) => {
    const regex = /^\d+$/;
    if (!e.target.value.match(regex)) return
    
    localStorage.setItem("orundums", e.target.value);
    countPulls();
  }

  const countOP = (e) => {
    const regex = /^\d+$/;
    if (!e.target.value.match(regex)) return
    
    localStorage.setItem("oriPrime", e.target.value);
    countPulls();
  }

  function countPulls() {
    const orundums = parseInt(localStorage.getItem("orundums")) || 0;
    const prime = parseInt(localStorage.getItem("oriPrime")) || 0;
    const total = orundums + prime * 180;
    setPulls(parseInt(total / 600));
  }

  return (
    <div className="container m-4">
      Counter page

      <div id="calculator">
        <div className="m-2">
          <label htmlFor="orundums">Orundums</label>
          <input name="orundums" type="number" defaultValue={orundums} onChange={countOrundums} className="text-black ml-2"></input>
        </div>
        <div className="m-2">
          <label htmlFor="prime">Originium Prime</label>
          <input name="prime" type="number" defaultValue={prime} onChange={countOP} className="text-black ml-2"></input>
        </div>
      </div>

      <div id="forecasting">
        <DateTable pulls={pulls} />
      </div>

    </div>
  );
}

export default Counter;
