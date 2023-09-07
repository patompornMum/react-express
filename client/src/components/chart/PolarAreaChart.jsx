import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

import { alpha } from '@mui/material';
import { blue, red } from '@mui/material/colors';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function getGradient(ctx, chartArea, colorHex = null) {
    let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, alpha(colorHex, 0.1));
    gradient.addColorStop(.5, alpha(colorHex, 0.3));
    gradient.addColorStop(1, alpha(colorHex, 0.6));
    return gradient;
}

const PolarAreaChart = ({ title = 'Chart', dataChart }) => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <PolarArea data={data} />
    );
}

export default PolarAreaChart