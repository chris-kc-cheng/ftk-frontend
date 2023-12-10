import { DataGrid } from '@mui/x-data-grid';
import { makeHeatmap, heatmapClass } from '../Util/heatmap';

const rows = Array.from({ length: 10 }, (_, row) => (
    Object.assign({ id: row }, ...Array.from({ length: 10 }, (_, column) => row * 0.2 + column * 0.02 - 1).map((x, y) => ({ [y]: x })))
));

const columns = Array.from({ length: 10 }, (_, i) => ({
    field: `${i}`, // Both has to be string, not number
    headerName: `${i}`,
    flex: 1,
    cellClassName: (params) => heatmapClass(params.value, -0.5, 0.5),
    valueFormatter: ({ value }) => value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 }),
}));

const Equity = () => {

    const styles = makeHeatmap();

    return (
        <DataGrid
            sx={{ ...styles }}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
        />
    );
}

export default Equity;