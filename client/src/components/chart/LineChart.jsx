import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { alpha, useTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function getGradient(ctx, chartArea, colorHex = null) {
    let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, alpha(colorHex, 0.1));
    gradient.addColorStop(.5, alpha(colorHex, 0.3));
    gradient.addColorStop(1, alpha(colorHex, 0.6));
    return gradient;
}



const LineChart = ({ title = 'Chart', dataChart }) => {

    const usetheme = useTheme();

    const labels = dataChart['labels'] ?? null;
    const values = dataChart['values'] ?? null;
    const target = dataChart['target'] ?? null;

    const options = {
        scales: {
            y: {
                grid: {
                    color: alpha(usetheme.palette.divider,0.08)
                }
            },
            x: {
                grid: {
                    color: alpha(usetheme.palette.divider,0.08)
                }
            }
        },
        elements: {
            line: {
                borderWidth: 4,
            },
        },
        responsive: true,
        interaction: {
            intersect: false,
            axis: 'x'
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            },
            title: {
                display: true,
                text: title
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Post',
                data: values,
                fill: true,
                borderColor: blue[700],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        // This case happens on initial chart load
                        return alpha(blue[700], 0.5);
                    }
                    return getGradient(ctx, chartArea, blue[700]);
                },
                tension: 0.4
            },
            {
                label: 'Target',
                data: target,
                borderColor: red[700],
                backgroundColor: alpha(red[700], 0.5),
            }
        ],
    };

    return (
        <Line options={options} data={data} />
    );
}

export default LineChart