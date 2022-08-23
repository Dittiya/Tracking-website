import { useEffect, useState } from "react";

function DateTable({ pulls }) {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const [dateRange, setDateRange] = useState(12);
	const [dates, setDates] = useState([]);
	const [monthlies, setMonthlies] = useState([]);
	const [certs, setCerts] = useState([]);
	const [notables, setNotables] = useState([]);

	useEffect(() => {
		calcForecast();
	}, [pulls]);

	function tableRange(date) {
		const dateArr = [];

		for (let i=0; i<dateRange; i++) {
			const mo = date.getMonth() + i < 12 ? date.getMonth() + i : date.getMonth() + i - 12;
			dateArr.push(months[mo])
		}

		return dateArr;
	}

	function checkEvents() {
		const events = [];

		for (let i=0; i<dates.length; i++) {
			events.push('None');
		}

		return events;
	}

	function calcForecast() {
		const monthly = 26;
		const distinction = 38; 
		const currentDate = new Date();
		const date = tableRange(currentDate);
		const earningsMonthly = [];
		const earningsMonthlyDistinction = [];

		setDates(date);
		for (let i=0; i<date.length; i++) {
			const earnings = pulls + monthly*i;
			earningsMonthly.push(earnings);
			earningsMonthlyDistinction.push(earnings + distinction);
		}

		setMonthlies(earningsMonthly);
		setCerts(earningsMonthlyDistinction);

		return 0;
	}

	return (
		<div>
			<div>
				Source:
				<li><strong>7200 orundums</strong> from Annihilation</li>
				<li><strong>4800 orundums</strong> from Dailies</li>
				<li><strong>5 pulls</strong> from Green Certs Shop</li>
				<li><strong>1 pull</strong> from Monthly login</li>
			</div>
			<div>
				Range of: {dateRange} months from {dates[0]} to {dates[dateRange-1]}
			</div>
			<table className="table-fixed w-full">
				<thead>
					<tr>
						<th className="uppercase bg-gray-800 p-2">0 / 0</th>
						{dates.map((val, key) => <th key={key} className="uppercase bg-gray-800">{val}</th>)}
					</tr>
				</thead>
				<tbody className="text-center">
					<tr>
						<th className="uppercase bg-gray-800 p-2">Earnings</th>
						{monthlies.map((val, key) => <td key={key}>{val}</td>)}
					</tr>
					<tr>
						<th className="uppercase bg-gray-800 p-2">+Distinction</th>
						{certs.map((val, key) => <td key={key}>{val}</td>)}
					</tr>
					<tr>
						<th className="uppercase bg-gray-800 p-2">Notable Event(s)</th>
						{notables.map((val, key) => <td key={key}>{val}</td>)}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default DateTable;
