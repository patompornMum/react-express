import { Button, Card, CardContent, Container, Grid, Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const NewFeed = () => {
    const [imagePreview, setImagePreview] = useState(null);

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

    return (
        <Container maxWidth="md" sx={{ padding: 2 }}>
            <Card variant='outlined'>
                <CardContent>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Content"
                                fullWidth
                                multiline
                                rows={2}
                                maxRows={4}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default NewFeed