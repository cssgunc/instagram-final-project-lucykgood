import React, { useState } from 'react';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

function Post({ post }) {
    const [likes, setLikes] = useState(post.likes);
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-user">
                    <p>{post.user}</p>
                </div>
            </div>
            {post.image_url && (
                <img
                    src={post.image_url}
                    alt="Post"
                    className="post-image"
                />
            )}
            <div className="post-footer">
                <div className="post-actions">
                    <FontAwesomeIcon icon={faHeart} className={`like-icon ${liked ? 'liked' : ''}`} onClick={toggleLike} />
                    <FontAwesomeIcon icon={faComment} className="comment-icon" />
                </div>
                <p>{likes} likes</p>
                <p>{post.description}</p>
            </div>
        </div>
    );
}

export default Post;