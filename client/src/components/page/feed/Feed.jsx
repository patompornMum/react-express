import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Fab,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { Add, BorderColorTwoTone, Favorite, FavoriteTwoTone } from '@mui/icons-material';

import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const data = [
  { id: 1, text: 'hello1', createdBy: 'Admin' },
  { id: 2, text: 'hello2', createdBy: 'Mum' },
  { id: 3, text: 'hello3', createdBy: 'To' },
  { id: 4, text: 'hello4', createdBy: 'Admin' },
  { id: 5, text: 'hello5', createdBy: 'Toom' }
];

const Feed = () => {
  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={0} md={2} display={{ xs: 'none', md: 'block' }}> </Grid>
        <Grid item xs={0} md={8}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {data.map((row, index) => {
              return (
                <Grid item xs={12} md={12} key={index}>
                  <Card variant="outlined" sx={{ borderRadius: 4 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                          {row.createdBy[0].toUpperCase()}
                        </Avatar>
                      }
                      title={row.createdBy}
                      subheader="01/01/23"
                    />
                    <CardMedia
                      component="img"
                      // height="194"
                      image='https://images.unsplash.com/photo-1542640244-7e672d6cef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE2OTEyMzUxNTI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
                      alt="Image"
                      sx={{ maxHeight: { xs: '300px', md: '700px' } }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ borderTop: '1px solid #e4e4e4' }}>
                      <IconButton sx={{ paddingRight: 0 }}>
                        <FavoriteTwoTone sx={{ color: '' }} />
                      </IconButton>
                      <IconButton sx={{ paddingRight: 0 }}>
                        <BorderColorTwoTone sx={{ color: 'green' }} />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={0} md={2} display={{ xs: 'none', md: 'block' }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, position: 'sticky', top: '80px' }}
          >
            <CardHeader subheader="Tools" />
          </Card>
        </Grid>
      </Grid>

      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        component={Link}
        to="/feed/new"
      >
        <Fab color="primary" variant="extended">
          <Add sx={{ marginRight: { md: 1 } }} />
          <Typography display={{ xs: 'none', md: 'block' }}>New</Typography>
        </Fab>
      </Box>

    </Container>
  )
}

export default Feed