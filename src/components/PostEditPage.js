import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const history = useHistory();
  const { postId } = useParams();
  const post = useLocation().state.post;
  const [title, setTitle] = useState(post.title);
  const [coverUrl, setCoverUrl] = useState(post.coverUrl);
  const [content, setContent] = useState(post.content);
  // const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);

  function onPostSaveButtonClick() {
    const promise = axios.put(`http://localhost:3333/posts/${postId}`, {
      title: title,
      coverUrl: coverUrl,
      content: content
    });
    promise.then(() => {
      setTimeout(() => {
        history.push(`/posts/${postId}`)
      }, 500);
    });
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
