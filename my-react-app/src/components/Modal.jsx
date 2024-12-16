import React, { useState } from 'react';
import "./Modal.css";

function Modal({ closeModal, post }) {
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <>
            <div className="background"></div>
            <div className="modal">
                <i
                    className="fa-solid fa-x fa-lg exit-button" 
                    onClick={closeModal}
                ></i>
                <img src={post.imageUrl} alt={post.description} className="modal-image" />
                <div className="modal-content">
                    <p>{post.description}</p>
                    <div className="modal-stats">
                        <p><i className={`fa-solid fa-heart ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}></i> {likes} likes</p>
                        <p><i className="fa-solid fa-comment"></i> {post.comments} comments</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;