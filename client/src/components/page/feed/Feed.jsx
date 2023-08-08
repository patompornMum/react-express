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

import { useEffect, useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//service
import { list } from '../../../services/feed';

//URL PUBLIC SERVER
const server_public_url = import.meta.env.VITE_SERVER_PUBLIC_URL ?? null;

const Feed = () => {
  const [data, setData] = useState([]);

  //redux
  const { user: reduxUser } = useSelector((state) => ({ ...state }));
  const token = reduxUser.info.token;
  const user_id = reduxUser.info.id;

  useEffect(() => {
    loadDataFeed(token);
  }, []);

  const loadDataFeed = async (token) => {
    console.log('LoadData')
    await list(token)
      .then((res) => {
        setData(res.data)
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={0} md={3} display={{ xs: 'none', md: 'block' }}> </Grid>
        <Grid item xs={0} md={6}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {data.map((row, index) => {
              return (
                <Grid item xs={12} md={12} key={index}>
                  <Card variant="outlined" sx={{ borderRadius: 4 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                          {row.created_by[0].toUpperCase()}
                        </Avatar>
                      }
                      title={row.created_by}
                      subheader={row.created_at}
                    />
                    {row.file != null && (
                      <CardMedia
                        component="img"
                        // height="194"
                        image={`${server_public_url}/uploads/${row.file}`}
                        alt="Image"
                        sx={{ maxHeight: { xs: '300px', md: '700px' } }}
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.content}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ borderTop: '1px solid #e4e4e4' }}>
                      <IconButton sx={{ paddingRight: 0 }}>
                        <FavoriteTwoTone sx={{ color: '' }} />
                      </IconButton>
                      {row.user_id == user_id && (
                        <IconButton sx={{ paddingRight: 0 }}>
                          <BorderColorTwoTone sx={{ color: 'green' }} />
                        </IconButton>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={0} md={3} display={{ xs: 'none', md: 'block' }}>
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