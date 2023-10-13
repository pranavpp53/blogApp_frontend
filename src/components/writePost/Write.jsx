import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './write.css';
import { addNewPost } from '../../service/allapi';



function Write() {
  const navigate=useNavigate()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorid, setAuthorid] = useState('')
    //state to hold image file
    const [image, setImage] = useState('')


 

  const setProfile=(e)=>{
    setImage(e.target.files[0])
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthorid(localStorage.getItem("userId"))

    const headerConfig = {
      "Content-Type": "multipart/form-data"
    }

    // Create a FormData object to send the file to the server
    const  formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorid',authorid);
    formData.append('image_file', image);



    try {
      const response = await addNewPost(formData,headerConfig)
      if(response.status<=210){
        console.log(response);
        alert(response.data.message)
        navigate("/")
      }
      else{
        alert(response.data.error)
      }
     
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="write ">
     <div className='w-50 container'>
        <img
          className="writeImg"
          src={image ? URL.createObjectURL(image) : 'https://i.postimg.cc/cJ3cSLb7/5614966-2933152.jpg'}
          alt=""
        />
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={setProfile}
            />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
          
        </form>
     </div>
    </div>
  );
}

export default Write;
