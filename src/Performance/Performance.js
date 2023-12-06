import { useEffect, useState } from 'react';
import { authFetch } from "../Auth";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const Performance = () => {

    const [data, setData] = useState();

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/risk/test`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    return (
        <Stack>
            <h1>Performance</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    {data && data.lineChartData &&
                        <LineChart
                            xAxis={[{ scaleType: 'point', data: data.lineChartData.index }]}
                            series={
                                data.lineChartData.columns.map((column, i) => {
                                    return {
                                        label: column,
                                        data: data.lineChartData.data.map(row => row[i]),
                                        curve: "linear"
                                    }
                                })
                            }
                            width={500}
                            height={300}
                        />
                    }

                </Grid>
                <Grid item xs={12} lg={6}>
                    {data && data.pieChartData &&
                        <PieChart
                            series={[{
                                data: data.pieChartData.columns.map((column, i) => {
                                    return {
                                        label: column,
                                        value: data.pieChartData.data[i]
                                    }
                                }),
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                            }]}
                            width={500}
                            height={300}
                        />
                    }
                </Grid>
                <Grid item xs={12} lg={6}>
                    {data && data.barChartData &&
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: data.barChartData.index }]}
                            series={data.barChartData.columns.map((column, i) => {
                                return {
                                    label: column,
                                    data: data.barChartData.data.map(row => row[i]),
                                    stack: 'byMonth'
                                }
                            })}
                            width={500}
                            height={300}
                        />
                    }
                </Grid>
                <Grid item xs={12} lg={6}>
                    {data && data.scatterChartData &&
                        <ScatterChart
                            width={500}
                            height={300}
                            series={
                                data.scatterChartData.index.map((index, i) => ({
                                    label: index,
                                    data: [{
                                        y: data.scatterChartData.data[i][0], // Return
                                        x: data.scatterChartData.data[i][1]  // Volatility
                                    }],
                                }))}
                            xAxis={[{ label: 'Volatility (%)', min: 0 }]}
                            yAxis={[{ label: 'Return (%)', min: 0 }]}
                        />
                    }
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Performance;