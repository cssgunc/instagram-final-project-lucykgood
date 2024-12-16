import { useState } from "react";
import "./Post.css"

function Post({ post }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="post" onClick={toggleOpen}>
                <img src={post.imageUrl} alt="Post" className="post-image"/>
                {isOpen && (
                    <div className="post-details">
                        <p>{post.description}</p>
                    </div>    
                )}
            </div>
        </>
    );
}

export default Post;