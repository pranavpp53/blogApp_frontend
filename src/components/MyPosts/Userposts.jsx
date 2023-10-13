import React, { useEffect, useState } from 'react'
import './userposts.css'
import { Link, useNavigate } from 'react-router-dom'
import { deletePost, singleUserPosts } from '../../service/allapi'
import BASE_URL from '../../service/baseurl'

function Userposts() {
    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate()

    const userData = async () => {
        const id = localStorage.getItem("userId");
        try {
            const response = await singleUserPosts(id);
            setUserPosts(response.data);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    console.log(userPosts);

    useEffect(() => {
        userData()
    }, [])

    const handleDeleteClick = async (id) => {
        const { data } = await deletePost(id)
        alert(data.message)
        navigate("/")
    };

    function formatDateToDaysAgo(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();
        const timeDifference = currentDate - date;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
        if (minutesDifference < 60) {
          return `${minutesDifference} minutes ago`;
        } else if (minutesDifference < 1440) { // Less than 24 hours
          const hoursDifference = Math.floor(minutesDifference / 60);
          return `${hoursDifference} hours ago`;
        } else if (minutesDifference < 2880) { // Less than 48 hours
          return "Yesterday";
        } else {
          const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          return `${daysDifference} days ago`;
        }
      }

    return (
        <>
            {userPosts.length > 0 ? userPosts.map((i) => (
                <div className="home-post-container">
                    <div className="post mt-5">
                        <img
                            className="postImg"
                            src={`${BASE_URL}/uploads/${i.image}`}
                            alt=""
                        />

                        <div className="postInfo">
                            <span className="postTitle">
                                <Link className="link">{i.title}</Link>
                            </span>
                            <hr />
                            <span className="postDate me-5 ms-auto">Posted : {formatDateToDaysAgo(i.date)}</span>
                        </div>
                        <p className="postDesc">{i.content}</p>

                        <div className="button-container ms-auto ">
                            <Link to={`/edit/${i._id}`}>
                                <button className="edit-button user-button text-success ">Edit</button>
                            </Link>
                            <button
                                className="delete-button ms-3 user-button text-danger"
                                onClick={() => handleDeleteClick(i._id)}
                            >
                                Delete
                            </button>
                            <Link to={`/view/${i._id}`}>
                                <button className="view-button ms-3 user-button text-info">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )) :
                <div className='userposts-container'>
                    <div className='userposts-noposts '>
                        <span className="userposts-headerTitleLg">You don't have any posts yet</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Userposts
