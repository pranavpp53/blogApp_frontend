import React, { useEffect, useState } from 'react'
import '../View/view.css'
import { Link, useParams } from 'react-router-dom'
import { singlePost } from '../../service/allapi'
import BASE_URL from '../../service/baseurl'

function Singleblog() {
    const { id } = useParams()
    const [post, setPost] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await singlePost(id);
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
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
    <div className="view-post-container">
                <div className="post mt-5">
                    <img
                        className="postImg"
                        src={`${BASE_URL}/uploads/${post.image}`}
                        alt=""
                    />

                    <div className="postInfo">
                        <span className="postTitle">
                            <Link className="link">{post.title}</Link>
                        </span>
                        <hr />
                        <span className="postDate me-5 ms-auto">{formatDateToDaysAgo(post.date)}</span>
                    </div>
                    <p className="view-postDesc">{post.content}</p>
                </div>
            </div>
    </>
  )
}

export default Singleblog