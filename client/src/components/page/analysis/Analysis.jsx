import { Card, CardContent, Container } from '@mui/material';

import { useEffect, useState } from 'react';

//Chart
import BarChart from '../../chart/BarChart';
import LineChart from '../../chart/LineChart';

//redux
import { useSelector } from 'react-redux';

//services
import { feedHistory, registerHistory } from '../../../services/analysis';

//date-fns
import { format } from 'date-fns';
import PolarAreaChart from '../../chart/PolarAreaChart';


const Analysis = () => {

    const [dataRegister, setDataRegister] = useState({
        labels: [],
        data: [],
        target: []
    });

    const [dataFeed, setDataFeed] = useState({
        labels: [],
        data: [],
        target: []
    });

    //redux
    const { user: reduxUser } = useSelector((state) => ({ ...state }));
    const token = reduxUser.info.token;

    useEffect(() => {
        loadDataRegister(token);
        loadDataFeed(token);
    }, [])

    const loadDataRegister = async (token) => {
        const year = format(new Date(), 'Y');

        const data = await registerHistory(token)
            .then((res) => res.data)
            .catch((err) => console.log(err))

        const labels = Object.keys(data).map((_, index) => {
            return format(new Date(year, index, 1), 'MMM')
        });
        const values = Object.values(data);

        setDataRegister({
            labels: labels,
            values: values,
            target: Array.from({ length: 12 }, () => (5))
        })

    }

    const loadDataFeed = async (token) => {
        const year = format(new Date(), 'Y');

        const data = await feedHistory(token)
            .then((res) => res.data)
            .catch((err) => console.log(err))

        const labels = Object.keys(data).map((_, index) => {
            return format(new Date(year, index, 1), 'MMM')
        });
        const values = Object.values(data);

        setDataFeed({
            labels: labels,
            values: values,
            target: Array.from({ length: 12 }, () => (5))
        })
    }

    return (
        <>
            <Container maxWidth="md" sx={{ padding: 2 }}>
                {/* <Card variant='outlined' sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <PolarAreaChart/>
                    </CardContent>
                </Card> */}
                <Card variant='outlined' sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <BarChart
                            title='Register'
                            dataChart={dataRegister}
                        />
                    </CardContent>
                </Card>
                <Card variant='outlined'>
                    <CardContent>
                        <LineChart
                            title='Post'
                            dataChart={dataFeed}
                        />
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Analysis