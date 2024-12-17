import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import './ProfilePage.css';
import Post from './Post';
import Modal from './Modal';
import emptyPfp from '../images/emptypfp.jpeg';

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError || !profileData) {
          console.error('Error fetching profile:', profileError?.message || 'No profile found');
          setUserProfile (null);
          return;
        }

        setUserProfile({
          ...profileData,
          profile_pic: profileData.profile_pic || emptyPfp,
          user_bio: profileData.user_bio || 'Insert bio here!',
        });
        setFollowers(profileData.followers || 0);

        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (postsError) {
          console.error('Error fetching posts:', postsError.message);
        } else {
            console.log('Posts data:', postsData);
            setUserPosts(postsData.reverse() || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

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

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  if (!userProfile) {
    return (
      <div className='empty-profile'>
        <h2>Welcome to Instagram</h2>
        <p>Your profile is currently empty. Start by creating your first post.</p>
        <button className='logout-button' onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return (
    <>
      <div className="profile-page">
        <div className="main-content">
          <div className="profile-header">
            <img src={userProfile?.profile_pic} alt="Profile" className="profile-pic" />
            <div className="profile-info">
              <div className="username-stats">
                <h2 className="username">{userProfile.user_handle}</h2>
                <button className={`follow-button ${isFollowing ? 'following' : ''}`} onClick={toggleFollow}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
              </div>
              <div className="follow-stats">
                <p><strong>{userPosts.length}</strong> posts</p>
                <p><strong>{followers}</strong> followers</p>
                <p><strong>{userProfile.following || 0}</strong> following</p>
              </div>
              <div className="profile-bio">
                <p><strong>{userProfile.first_name} {userProfile.last_name}</strong></p>
                <p>{userProfile.user_bio}</p>
              </div>
            </div>
          </div>
          <div className="posts">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <div key={post.id} onClick={() => openModal(post)}>
                  <Post post={post} />
                </div>
              ))
            ) : (
              <p className="no-posts">No posts yet. Start sharing your moments!</p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} post={selectedPost} />}
    </>
  );
}

export default ProfilePage;