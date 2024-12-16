import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './ProfilePage.css';
import Post from './Post';
import Modal from './Modal';
import post1 from '../images/1mom.jpeg';
import post2 from '../images/2beach.jpeg';
import post3 from '../images/3jumping.jpeg';
import post4 from '../images/4flowers.jpeg';
import post5 from '../images/5friends.jpeg';
import post6 from '../images/6sunset.jpeg';
import post7 from '../images/7reese.jpeg';
import post8 from '../images/8boots.jpeg';
import post9 from '../images/9dodgers.jpeg';
import pfp from '../images/pfp.jpeg';

function ProfilePage() {
    const [followers, setFollowers] = useState(1682);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const posts = [
        { id: 1, imageUrl: post1, description: 'things are going steady!!', likes: 474, comments: 61 },
        { id: 2, imageUrl: post2, description: 'beach!', likes: 12, comments: 0 },
        { id: 3, imageUrl: post3, description: 'yay!', likes: 18, comments: 0 },
        { id: 4, imageUrl: post4, description: 'some flowers for your morning.', likes: 7, comments: 0 },
        { id: 5, imageUrl: post5, description: 'from the country to the coast!', likes: 394, comments: 57 },
        { id: 6, imageUrl: post6, description: 'reason #2!', likes: 343, comments: 21 },
        { id: 7, imageUrl: post7, description: 'reason #1 for a chattanooga summer!', likes: 463, comments: 57 },
        { id: 8, imageUrl: post8, description: 'so chatt!', likes: 14, comments: 1 },
        { id: 9, imageUrl: post9, description: 'thanks for the tour!', likes: 456, comments: 56 },
    ];

    const toggleFollow = () => {
        setFollowers(isFollowing ? followers - 1 : followers + 1);
        setIsFollowing(!isFollowing);
    };

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='profile-page'>
                <Sidebar />
                <div className='main-content'>
                    <div className='profile-header'>
                        <img src={pfp} alt='Profile' className='profile-pic' />
                        <div className='profile-info'>
                            <h2>@lucykgood_</h2>
                            <div className='profile-stats'>
                                <p>9 posts {followers} followers 1308 following</p>
                            </div>
                            <div className='profile-name'>
                                <p>Lucy Good</p>
                            </div>
                            <div className='profile-bio'>
                                <p>chatt // @unckappadelta // @ylcedarridge</p>
                            </div> 
                            <button className={`follow-button ${isFollowing ? 'following' : ''}`} onClick={toggleFollow}>
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                    <div className='posts'>
                        {posts.map(post => (
                            <div key={post.id} onClick={() => openModal(post)}>
                                <Post post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal closeModal={closeModal} post={selectedPost} />}
        </>
    );
}

export default ProfilePage;