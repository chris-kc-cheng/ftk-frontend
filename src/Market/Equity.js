//import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const rows = Array.from({ length: 10 }, (_, row) => (
    Object.assign({ id: row }, ...Array.from({ length: 10 }, (_, column) => row * 0.2 + column * 0.02 - 1).map((x, y) => ({ [y]: x })))
));

const columns = Array.from({ length: 10 }, (_, i) => ({
    field: `${i}`, // Both has to be string, not number
    headerName: `${i}`,
    flex: 1,
    cellClassName: (params) => {
        const percentile = Math.floor((params.value + 1) / (1 + 1) * 100);
        return `heatmap-${percentile}`;
    },
    valueFormatter: ({ value }) => value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 }),
}));

const makeStyle = (minVal = -1, maxVal = 1, gradient = 100, minRGB = [248, 105, 107], maxRGB = [99, 190, 123]) => {
    const rgb = []
    const range = maxVal - minVal
    for (let i = 0; i < gradient; i++) {
        const value = minVal + i * range / 100;
        const distance = Math.abs(value) / range / 2;
        if (value > 0) {
            console.log(distance);
            rgb.push([255 - Math.floor((255 - maxRGB[0]) * distance),
                255 - Math.floor((255 - maxRGB[1]) * distance),
                255 - Math.floor((255 - maxRGB[2]) * distance)]);
        }
        else {
            rgb.push([255 - Math.floor((255 - minRGB[0]) * distance),
                255 - Math.floor((255 - minRGB[1]) * distance),
                255 - Math.floor((255 - minRGB[2]) * distance)]);
        }
    }
    return Object.assign({}, ...rgb.map((x, i) => ({ [`& .heatmap-${i}`]: ({ backgroundColor: `rgb(${x[0]},${x[1]},${x[2]});` }) })));
}

const Equity = () => {

    const styles = makeStyle();

    return (
        <Box sx={{ ...styles }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default Equity;