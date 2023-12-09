import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from "../Auth";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import ColoredAvatar from '../Util/ColoredAvatar';

const AssetClasses = () => {

    const [assetClasses, setAssetClasses] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/fund/assetClass`)
            const json = await response.json();
            setAssetClasses(json);
        }
        fetchNotes(0, 50);
    }, []);

    return (
        <>
            <h1>Asset Classes</h1>
            <Grid container spacing={2}>
                {assetClasses.map(assetClass =>
                    <Grid key={assetClass} item xs={12} md={6} lg={4} xl={3}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <ColoredAvatar name={assetClass} />
                                }
                                title={assetClass}
                            />
                            <CardActions>
                                <Button size="small" component={Link} to={`/Research/AssetClass/${assetClass.replace(" ", "_")}`}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default AssetClasses;