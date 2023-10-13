import React, { useEffect, useState } from 'react'
import './edit.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BASE_URL from '../../service/baseurl'
import { editPostContent, singlePost } from '../../service/allapi'

function Edit() {
    const { id } = useParams()
    const [post, setPost] = useState('')
    const navigate=useNavigate()

  const editpost=(e)=>{
    e.preventDefault()
    const value=e.target.value
    const key=e.target.name

    setPost({...post,[key]:value})
}

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await editPostContent(post,id)
      if(response.status<=210){
        console.log(response);
        alert(response.data.message)
        navigate(`/view/${post._id}`)
      }
      else{
        alert(response.data.error)
      }
     
    } catch (error) {
      console.error(error);
      
    }
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
                            <input className="link text-center" name='title' value={post.title} onChange={editpost}></input>
                        </span>
                        <hr />
                        <span className="postDate me-5 ms-auto">{post.date}</span>
                    </div>
                    <textarea className="postDesc edit-input" name='content' value={post.content} onChange={editpost}></textarea>
                    <div className="button-container ms-auto mt-3 ">
                        {/* <label
                            className="edit-button edit-edit-button text-info me-3  " htmlFor="fileInput"
                        >
                            change image
                            <input
                                id="fileInput"
                                type="file"
                                style={{ display: 'none' }}
                            />
                        </label> */}
                        <button onClick={handleSubmit}
                            className="edit-button edit-edit-button text-success "
                        >
                            Save changes
                        </button>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Edit