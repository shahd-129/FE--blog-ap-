import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Homemenu from 'Component/HomeMenu/Homemenu';
import Box from '@mui/material/Box';
import CreatePost from 'View/CreatePost/CreatePost';
import { Grid } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
  const [expanded, setExpanded] = React.useState(false);
  const [post, setPost] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  async function getAllPost() {
    try {
      const { data } = await axios.get("http://localhost:3000/post/getAllPost", {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setPost(data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []); 

  return (
    <>
     <Grid item xs={12} md={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 5, alignItems: 'center', gap: 3, width: '100%' }}>
          <CreatePost refreshPosts={getAllPost} />
        {post.map((el) => (
          <Card
            key={el._id}
            sx={{
              maxWidth: 600, 
              borderRadius: 8,
              padding: 2,
              background: '#ffffff',
              boxShadow: 3,
              marginBottom: 2,
              overflow: 'hidden',
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {/* {el?.firstName[0]} */}
                </Avatar>
              }
              action={<Homemenu />}
              // title={`${el?.firstName} ${el?.lastName}`}
              subheader={new Date(el?.date).toLocaleDateString()}
            />
            <CardMedia
              component="img"
              height="auto"
              image={el?.image?.url}
              alt="Post image"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {el?.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Details:</Typography>
                <Typography paragraph>
                  Additional content or details can be placed here.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
    ))}
        </Box>
        
    </Grid>
    </>
  );
}
