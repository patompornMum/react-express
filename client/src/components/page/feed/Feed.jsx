import { Add, BorderColorTwoTone, ContactPageTwoTone, FavoriteTwoTone, FeedTwoTone } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme
} from '@mui/material';

import { blue, green, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

//date-fns
import { format, formatDistanceToNow } from 'date-fns';

//redux
import { useSelector } from 'react-redux';

//service
import { list } from '../../../services/feed';
import { like, unlike } from '../../../services/like';

//URL PUBLIC SERVER
const server_public_url = import.meta.env.VITE_SERVER_PUBLIC_URL ?? null;

const Feed = () => {
  const [data, setData] = useState([]);
  const [feedType, setFeedType] = useState('feed');

  //redux
  const { user: reduxUser } = useSelector((state) => ({ ...state }));
  const { socket: reduxSocket } = useSelector((state) => ({ ...state }));
  const token = reduxUser.info.token;
  const user_id = reduxUser.info.id;
  const userOnline = reduxSocket.userOnline ?? null;
  console.log(userOnline)

  useEffect(() => {
    loadDataFeed(token, feedType);
  }, []);

  const loadDataFeed = async (token, feedType) => {
    console.log('LoadData')
    console.log(feedType)

    const respData = await list(token)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    console.log(respData)

    if (feedType == "favorite") {
      const filteredLikeStatus = await respData.filter(item => item.like_status === 1);
      setData(filteredLikeStatus);
    } else if (feedType == "myFeed") {
      const filteredLikeStatus = await respData.filter(item => item.user_id === user_id);
      setData(filteredLikeStatus);
    } else {
      setData(respData)
    }
  }

  const handleClickFavorite = async (feedId, feedIndex) => {
    const updatedData = [...data];
    const toggleLike = (updatedData[feedIndex].like_status === 1) ? 0 : 1;
    updatedData[feedIndex].like_status = toggleLike;
    updatedData[feedIndex].likes = updatedData[feedIndex].likes + ((toggleLike) ? +1 : -1);

    setData(updatedData);

    if (toggleLike == 1) {
      //Like API
      await like(token, { feedId: feedId })
        .then((res) => {
          console.log(`Feed ID ${feedId} // Like`)
        })
        .catch((err) => console.log(err))
    } else {
      //Unlike API
      await unlike(token, { feedId: feedId })
        .then((res) => {
          console.log(`Feed ID ${feedId} // Unlike`)
        })
        .catch((err) => console.log(err))
    }
  }

  const handleChangeFeedType = async (event, nextView) => {
    if (nextView !== null) {
      setFeedType(nextView)
      loadDataFeed(token, nextView);
    }
  }

  const formatSubheaderTimeAgo = (dateTime) => {
    const newDate = new Date(dateTime);
    const timeAgo = formatDistanceToNow(newDate);
    return format(newDate, 'd MMM Y HH:mm') + ` (${timeAgo})`;
  }

  const usetheme = useTheme();

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Grid container spacing={2} paddingBottom={{ xs: 10, md: 2 }}>
        <Grid item xs={0} md={3} display={{ xs: 'none', md: 'block' }}> </Grid>
        <Grid item xs={0} md={6}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {data.map((row, index) => {
              return (
                <Grid item xs={12} md={12} key={index}>
                  <Card variant="outlined" sx={{ borderRadius: 4 }}>
                    <CardHeader
                      avatar={
                        <Badge
                          color="success"
                          variant="dot"
                          invisible={userOnline[row.user_id] ? false : true}
                        >
                          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                            {row.created_by && row.created_by[0].toUpperCase()}
                          </Avatar>
                        </Badge>
                      }
                      title={row.created_by}
                      subheader={formatSubheaderTimeAgo(row.created_at)}
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
                      <Typography
                        component="pre"
                        variant="body2"
                        color="text.secondary"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {row.content}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ borderTop: '1px solid #e4e4e4' }}>
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <>
                          <IconButton
                            sx={{
                              color: row.like_status ? red[600] : ''
                            }}
                            onClick={() => { handleClickFavorite(row.id, index) }}
                          >
                            <FavoriteTwoTone />
                          </IconButton>
                          {row.likes > 0 &&
                            <Typography
                              paddingY={1}
                              style={{ marginLeft: 0 }}
                            >
                              {row.likes} Likes
                            </Typography>
                          }
                        </>
                        {row.user_id == user_id && (
                          <IconButton
                            component={Link}
                            to={`/feed/edit/${row.id}`}
                          >
                            <BorderColorTwoTone sx={{ color: green[700] }} />
                          </IconButton>
                        )}
                      </Stack>

                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        {/* PC RIGHT BAR */}
        <Grid item xs={0} md={3} display={{ xs: 'none', md: 'block' }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, position: 'sticky', top: '80px' }}
          >
            <CardHeader subheader="Tools" sx={{ borderBottom: '1px solid #e4e4e4' }} />
            <CardContent>
              <ToggleButtonGroup
                orientation="vertical"
                value={feedType}
                exclusive
                size="small"
                fullWidth={true}
                onChange={handleChangeFeedType}
                sx={{
                  '& .MuiButtonBase-root': {
                    '&.Mui-selected': {
                      backgroundColor: usetheme.palette.activeColor
                    },
                    // ':hover': {
                    //   backgroundColor: 'red'
                    // }
                  }
                }}
              >
                <ToggleButton value="feed" sx={{ justifyContent: 'start' }}>
                  <FeedTwoTone sx={{ color: blue[800] }} />
                  <Typography paddingX={1}>Feed</Typography>
                </ToggleButton>
                <ToggleButton value="favorite" sx={{ justifyContent: 'start' }}>
                  <FavoriteTwoTone sx={{ color: red[600] }} />
                  <Typography paddingX={1}>FAVORITE</Typography>
                </ToggleButton>
                <ToggleButton value="myFeed" sx={{ justifyContent: 'start' }}>
                  <ContactPageTwoTone sx={{ color: green[800] }} />
                  <Typography paddingX={1}>MY FEED</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Mobile Bottom Bar */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '2px solid #e4e4e4'
        }}
        display={{ xs: 'block', md: 'none' }}
      >
        <BottomNavigation
          showLabels
          value={feedType}
          onChange={handleChangeFeedType}
        >
          <BottomNavigationAction
            label="Feed"
            value="feed"
            icon={<FeedTwoTone />}
          />
          <BottomNavigationAction
            label="Favorite"
            value="favorite"
            icon={<FavoriteTwoTone />}
          />
          <BottomNavigationAction
            label="My Feed"
            value="myFeed"
            icon={<ContactPageTwoTone />}
          />
        </BottomNavigation>
      </Box>

      {/* Button New Feed */}
      <Box
        position="fixed"
        bottom={{ xs: '60px', md: '20px' }}
        right={{ xs: '1px', md: '20px' }}
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