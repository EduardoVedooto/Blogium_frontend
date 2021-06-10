import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const promise = axios.get("http://localhost:3333/posts");
    promise.then(({ data }) => {
      setPosts(data.posts);
    });
  }, []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
