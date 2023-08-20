import { Box, Button, Card, CardContent, Container, Grid, Input, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Service
import { create } from '../../../services/feed';

//redux
import { useSelector } from 'react-redux';
import { ArrowBackIos } from '@mui/icons-material';


const NewFeed = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const navi = useNavigate();

    //redux
    const { user: reduxUser } = useSelector((state) => ({ ...state }));
    const token = reduxUser.info.token;

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Send FormData to backend
        const data = new FormData(event.currentTarget);

        await create(token, data)
            .then((res) => {
                alert('upload success')
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
                                    New Feed !
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
                                    onChange={handleChangeImage}
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

export default NewFeed