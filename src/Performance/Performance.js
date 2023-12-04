import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const Performance = () => {

    useEffect(() => {

    }, []);

    return (
        <Stack>
            <h1>Performance</h1>

            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        curve: "linear", label: 'Fund',
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                    {
                        curve: "linear", label: 'Benchmark',
                        data: [2, 3, 4, 7, 1, 3],
                    }
                ]}
                width={500}
                height={300}
            />

            <BarChart
                xAxis={[{ scaleType: 'band', data: [2021, 2022, 2023] }]}
                series={[{
                    label: "US/Canada",
                    data: [4, 3, 5],
                    stack: 'stack1'
                }, { label: "Europe", data: [1, 6, 3], stack: 'stack1' }, { label: "Asia", data: [2, 5, 4], stack: 'stack1' }]}
                width={500}
                height={300}
            />

            <PieChart
                series={[
                    {
                        data: [
                            { value: 55, label: 'Equity' },
                            { value: 40, label: 'Fixed Income' },
                            { value: 5, label: 'Cash' },
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    },
                ]}
                width={500}
                height={300}
            />

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