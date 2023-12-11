import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from "../Auth";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: '#',
        width: 75,
        editable: false
    },
    {
        field: 'name',
        headerName: 'Fund Name',
        editable: false,
        flex: 1
    },
    {
        field: 'firm',
        headerName: 'Firm Name',
        editable: false,
        flex: 1
    },
];

const Followed = () => {

    const navigate = useNavigate();

    const [funds, setFunds] = useState([]);

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/fund/follow/`)
            .then((response) => response.json())
            .then((data) => {
                setFunds(data.map((fund, index) => ({ id: index + 1, ...fund })));
            })
    }, []);

    return (
        <>
            <h1>Followed Funds</h1>
            <DataGrid
                rows={funds}
                columns={columns}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                onRowClick={(params) => navigate(`/Research/${params.row._id}`)}
            />
        </>
    );
}

export default Followed;