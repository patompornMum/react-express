import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const NewFeed = () => {
    return (
        // <Container maxWidth={false} sx={{ padding: 2 }}>
        // </Container>
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