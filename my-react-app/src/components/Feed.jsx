import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import './Feed.css';
import Post from './Post'; 

function Feed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error } = await supabase
          .from('posts')
          .select('id, user_id, image_url, description, created_at, likes');

        if (error) {
          throw new Error(error.message);
        }

        
        const shuffledPosts = postsData.sort(() => Math.random() - 0.5);

        setPosts(shuffledPosts);
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchPosts();
  }, []); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feed">
      {posts.length > 0 ? (
        <div className="post-grid">
          {posts.map((post) => (
            <Post key={post.id} post={post} /> 
          ))}
        </div>
      ) : (
        <p className="no-posts">No posts available yet. Check back later!</p>
      )}
    </div>
  );
}

export default Feed;
