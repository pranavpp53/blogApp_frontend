import React, { useEffect, useState } from 'react'
import './view.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, singlePost } from '../../service/allapi'
import BASE_URL from '../../service/baseurl'


function View() {
    const { id } = useParams()
    const [post, setPost] = useState('')
    const navigate=useNavigate()

    const handleDeleteClick = async (id) => {
        const { data } = await deletePost(id)
        alert(data.message)
        navigate("/")
    };

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
                        <span className="postDate me-5 ms-auto">{post.date}</span>
                    </div>
                    <p className="view-postDesc">{post.content}</p>

                    <div className="button-container ms-auto ">
                        <Link to={`/edit/${post._id}`}>
                            <button
                                className="edit-button user-button text-success "
                            >
                                Edit
                            </button>
                        </Link>
                        <button
                            className="delete-button ms-3 user-button text-danger"
                            onClick={() => handleDeleteClick(post._id)}

                        >
                            Delete
                        </button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default View