import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { BorderColorTwoTone, Favorite, FavoriteTwoTone } from '@mui/icons-material';

import { blue } from '@mui/material/colors';

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
      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 3, md: 4 }}
      >
        {data.map((row, index) => {
          return (
            <Grid item xs={12} md={7} key={index}>
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
    </Container>
  )
}

export default Feed