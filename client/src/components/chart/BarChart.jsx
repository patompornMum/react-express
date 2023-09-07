import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { alpha, useTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function getGradient(ctx, chartArea, colorHex=null) {
    let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    // let gradient = ctx.createLinearGradient(chartArea.top, 0, chartArea.bottom, 0);
    gradient.addColorStop(0, alpha(colorHex, 0.2));
    gradient.addColorStop(.5, alpha(colorHex, 0.3));
    gradient.addColorStop(1, alpha(colorHex, 0.6));
    return gradient;
}

const BarChart = ({ title = 'Chart', dataChart }) => {

    const usetheme = useTheme();

    const labels = dataChart['labels'] ?? null;
    const values = dataChart['values'] ?? null;
    const target = dataChart['target'] ?? null;

    const options = {
        // indexAxis: 'y',
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
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        interaction: {
            mode: 'index'
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
            }
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Register',
                data: values,
                borderColor: blue[700],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        // This case happens on initial chart load
                        return alpha(blue[700], 0.5);
                    }
                    return getGradient(ctx, chartArea, blue[700]);
                }
            },
            {
                label: 'Target',
                data: target,
                borderColor: red[700],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        // This case happens on initial chart load
                        return alpha(red[700], 0.5);
                    }
                    return getGradient(ctx, chartArea, red[700]);
                }
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    );
}

export default BarChart