import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authFetch } from "../Auth";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Fund Name',
      width: 150,
      editable: false,
    },
    {
      field: 'firm',
      headerName: 'Firm Name',
      width: 150,
      editable: false,
    },
  ];

const AssetClass = () => {

    const params = useParams();
    const [assetClass, setAssetClass] = useState(params.assetClass.replace("_", " "));
    const [funds, setFunds] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/fund/assetClass/${encodeURIComponent(assetClass)}`)
            const json = await response.json();
            setFunds(json);
        }
        fetchNotes(0, 50);
    }, []);

    return (
        <>
            <h1>Asset Class - {assetClass}</h1>
            <p>Count {funds.length}</p>
            <DataGrid
                rows={funds}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={row => row._id}
            />
        </>
    );
}

export default AssetClass;