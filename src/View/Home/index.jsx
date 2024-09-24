import React from 'react';
import Box from '@mui/material/Box';

import { Grid} from '@mui/material';
import { useSelector } from 'react-redux';
import { CreatePost } from 'View';
import PostCard from 'Component/HomeComponents/PostCard';
import { useGetPostsQuery } from '../../Redux/Api/postApi';


export default function Home() {


  // const [addReact] = useAddReactMutation();
  const userId = useSelector((state) => state.token?.user?.userId);


  const { data: posts, isLoading } = useGetPostsQuery({});

  console.log("posts",posts);



  return (
    <>
      <Grid item xs={12} md={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 5, alignItems: 'center', gap: 3, width: '100%' }}>
          <CreatePost />
          {posts?.map((post) => <PostCard post={post} />)}
        </Box>
      </Grid>
    </>
  );
} 
