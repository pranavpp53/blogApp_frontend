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
      <div id="carouselExampleDark" class="carousel carousel-dark slide " data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner eh115 ">
          <div class="carousel-item active " data-bs-interval="3000">
            <img src="https://i.postimg.cc/1ts2cQR1/woman-with-smartphone-cup-coffee.jpg" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block   home-img-1">
              <p>Discover</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="https://i.postimg.cc/90FfkKpv/girl-is-reading-book-cafe.jpg" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block home-img-2">
              <p> Learn</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="https://i.postimg.cc/FKMWDQ9H/education-work-vanlife-concept-cheerful-lovely-redhead-woman-glasses-standing-near-table-read.jpg" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block home-img-3">
              <p>Explore</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
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
