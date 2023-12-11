import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from "../Auth";
import Breadcrumbs from '@mui/material/Breadcrumbs';
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

const Tag = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [assetClass, setAssetClass] = useState(params.tag.replace("_", " "));
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [funds, setFunds] = useState([]);

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/fund/tag/${assetClass}/ancestors`)
            .then((response) => response.json())
            .then((data) => {
                setBreadcrumbs(data);
            })

        authFetch(`${process.env.REACT_APP_API_ROOT}/fund/assetClass/${assetClass}`)
            .then((response) => response.json())
            .then((data) => {
                setFunds(data.map((fund, index) => ({ id: index + 1, ...fund })));
            })
    }, [assetClass]);

    if (false) {
        setAssetClass();
    }

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs.map((item) =>
                    <div>{item}</div>
                )}
            </Breadcrumbs>
            <h1>{assetClass}</h1>
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

export default Tag;