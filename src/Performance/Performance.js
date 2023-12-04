import { useEffect, useState } from 'react';
import { authFetch } from "../Auth";
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const Performance = () => {

    const [data, setData] = useState();

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/performance/test`)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
    }, []);

    return (
        <Stack>
            <h1>Performance</h1>

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

            <ScatterChart
                width={500}
                height={300}
                series={[
                    {
                        label: 'Fund',
                        data: [{ x: 12.3, y: 23 }],
                    },
                    {
                        label: 'Benchmark',
                        data: [{ x: 20, y: 15.6 }],
                    },
                ]}
                xAxis={[{ label: 'Volatility (%)', min: 0 }]}
                yAxis={[{ label: 'Return (%)', min: 0 }]}
            />
        </Stack>
    );
}

export default Performance;