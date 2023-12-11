import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from "../Auth";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ColoredAvatar from '../Util/ColoredAvatar';


const Tags = () => {

    const [tab, setTab] = useState(0);
    const [tree, setTree] = useState();
    const [assetClasses, setAssetClasses] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/fund/assetClass`)
            const json = await response.json();
            setAssetClasses(json);
        }
        fetchNotes(0, 50);

        authFetch(`${process.env.REACT_APP_API_ROOT}/fund/tag/Asset Class/descendants`)
            .then((response) => response.json())
            .then((data) => {
                const createNode = (name) => {
                    const item = data.find(d => d._id === name);
                    return ({
                        id: name,
                        children: item.children.map(n => createNode(n))
                    })
                }
                let top = data.filter(d => d.depth === 0);
                top.sort((a, b) => a._id > b._id ? 1 : -1);
                setTree({
                    id: "Asset Class",
                    children: top.map(o => createNode(o._id))
                });
            });
    }, []);

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    const renderTree = (node) => (
        <TreeItem key={node.id} nodeId={node.id} label={node.id}>
            {node.children.length === 0 ? null :
                node.children.map(child => renderTree(child))
            }
        </TreeItem>
    );

    return (
        <>
            <h1>Asset Classes</h1>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab}>
                        <Tab value={0} label="Card View" />
                        <Tab value={1} label="Tree View" />
                    </TabList>
                </Box>
                <TabPanel value={0}>
                    <Grid container spacing={2}>
                        {assetClasses.map(assetClass => {
                            const name = assetClass._id;
                            return (
                                <Grid key={name} item xs={12} md={6} lg={4} xl={3}>
                                    <Card>
                                        <CardActionArea component={Link} to={`/Research/Tag/${name.replace(" ", "_")}`}>
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
                </TabPanel>
                <TabPanel value={1}>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={['Asset Class', 'Alternatives', 'Debt', 'Equity']}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {tree && renderTree(tree)}
                    </TreeView>
                </TabPanel>
            </TabContext>
        </>
    );
}

export default Tags;