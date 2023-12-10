import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from "../Auth";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
                {assetClasses.map(assetClass => {
                    const name = assetClass._id;
                    return (
                        <Grid key={name} item xs={12} md={6} lg={4} xl={3}>
                        <Card>
                            <CardActionArea component={Link} to={`/Research/AssetClass/${name.replace(" ", "_")}`}>
                                <CardHeader
                                    avatar={
                                        <ColoredAvatar name={name} />
                                    }
                                    title={name}
                                />
                                <CardContent>
                                    <Typography variant="h4">
                                        {assetClass.count}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    );
                })}
            </Grid>
        </>
    );
}

export default AssetClasses;