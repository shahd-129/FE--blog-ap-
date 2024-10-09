import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { CreatePost } from 'View';
import { useGetPostsQuery } from '../../Redux/Api/postApi';
import PostCard from 'Component/HomeComponent/PostCard';
import { useTranslation } from 'react-i18next';
export default function Home() {
   const {t} = useTranslation()
  const [post, setPost] = useState()
  const { data: posts = [], isLoading } = useGetPostsQuery({});
  useEffect(() => {
    if (posts) {
      setPost(posts);
    }
  }, [posts]);
  
    
  return (
    <Grid item xs={12} md={9}>
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 5, alignItems: 'center', gap: 3, width: '100%' }}>
        <CreatePost />
        {isLoading ? (
          <Typography color={"#fff"}>{t("Loading")}</Typography>
        ) : (
          posts?.map((post) =><PostCard post={post} /> )
        )}
      </Box>
    </Grid>
  );
}
