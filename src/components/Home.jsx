import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { allPosts } from '../service/allapi';
import BASE_URL from '../service/baseurl';

function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const allPostsCall = async () => {
    const response = await allPosts();
    setAllBlogs(response.data);
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

  useEffect(() => {
    allPostsCall();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* top view image in home */}
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleLg">BLOG</span>
        </div>
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      </div>

      {/* Display current page posts */}
      {currentPosts.map((i) => (
        <Link to={`/singleblog/${i._id}`} className="link">
          <div className="home-post-container" key={i.id}>
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
                <div className='d-flex'>
                  <span className='postDate me-5 '> Author : {i.author.username} </span>
                  <span className="postDate ms-5">Posted : {formatDateToDaysAgo(i.date)}</span>
                </div>
              </div>
              <p className="postDesc">{i.content}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* Pagination */}
      <div className='w-100 container'>
        <div className="pagination ">
          {Array(Math.ceil(allBlogs.length / postsPerPage))
            .fill()
            .map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
