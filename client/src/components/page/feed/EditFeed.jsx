import { Button, Card, CardContent, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

//Service
import { read, update } from '../../../services/feed';

//URL PUBLIC SERVER
const server_public_url = import.meta.env.VITE_SERVER_PUBLIC_URL ?? null;

//redux
import { ArrowBackIos } from '@mui/icons-material';
import { useSelector } from 'react-redux';


const UpdateFeed = () => {
    const { id } = useParams();

    const [data, setData] = useState({
        title: '',
        content: '',
        file: ''
    });
    const [oldData, setOldData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const navi = useNavigate();

    //redux
    const { user: reduxUser } = useSelector((state) => ({ ...state }));
    const token = reduxUser.info.token;

    useEffect(() => {
        loadDataFeed(token);
    }, []);

    const loadDataFeed = async (token) => {
        console.log('LoadData')
        await read(token, id)
            .then((res) => {
                setData(res.data)
                setOldData(res.data);
                setImagePreview(res.data.file &&
                    `${server_public_url}/uploads/${res.data.file}`
                )
            })
            .catch((err) => console.log(err))
    }

    const handleChangeImage = (e) => {
        console.log('change image')
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send FormData to backend
        const dataForm = new FormData(event.currentTarget);

        await update(token, id, dataForm)
            .then((res) => {
                alert('updated success')
                navi('/feed')
            })
            .catch((err) => console.log(err))
    }

    return (
        <Container maxWidth="md" sx={{ padding: 2 }}>
            <Card variant='outlined'>
                <CardContent>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h4' textAlign='center'>
                                    Update Feed : {oldData?.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={imagePreview}
                                    style={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="file"
                                    name="file"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleChangeImage(e);
                                    }}
                                    inputProps={{
                                        accept: ".jpg, .png",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    name="title"
                                    required
                                    value={data.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Content"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    maxRows={4}
                                    name="content"
                                    value={data.content}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        startIcon={<ArrowBackIos />}
                                        component={Link}
                                        to="/feed"
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" type="submit">
                                        Submit
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default UpdateFeed