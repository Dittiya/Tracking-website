import { h, html } from "gridjs";
import classesJSON from '../yolo_utils/classes.json';

const imgUrl = 'https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/avatars/';

export const columns = [
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
        width: '35%',
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
                onClick: () => alert(`Adding 1 of ${row.cells[0].data}`)
            }, 'Add');

            const reduce = h('button', {
                className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                onClick: () => alert(`Reducing 1 of ${row.cells[0].data}`)
            }, 'Reduce');

            return [add, reduce];
        }
    }
];
