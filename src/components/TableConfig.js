import { h } from "gridjs";

export const columns = [
    {
        name: 'Name',
        width: '100%',
        formatter: (cell) => `Image: ${capitalize(cell)}`
    },
    {
        name: 'Count',
        width: '25%'
    },
    {
        name: 'Actions',
        width: '50%',
        attributes: (cell) => {
            if (cell) {
                return {
                    'style': 'text-align: center; cursor: pointer;',
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

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
