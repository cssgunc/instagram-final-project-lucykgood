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
        <div className="modal">
            <div className='modal-content'>
                <img src={post.image_url} alt={post.description} className="modal-image" />
                <div className='modal-stats'>
                    <div className='modal-description'>
                        <p>{post.description}</p>
                    </div>
                    <div className='modal-footer'>
                        <div className='icons'>
                            <p><i className={`fa-solid fa-heart ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}></i> {likes} </p>
                            <p><i className="fa-solid fa-comment"></i> {post.comments} </p>
                        </div>
                    </div>
                </div>
                <i className="fa-solid fa-x fa-lg exit-button" onClick={closeModal}></i>
            </div>
        </div>
    );
}

export default Modal;