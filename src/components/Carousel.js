import React from "react";
import MovieCard from "../components/MovieCard"
import { fetchMoviesForCarousel } from "../utils";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Carousel(props) {

  const [viewableSlideCount, setViewableSlideCount] = React.useState(6.5);
  const [movieData, setMovieData] = React.useState([]);

  const handleViewableSlideCountStateChange = (updatedValue) => {

    setViewableSlideCount(updatedValue);
  }

  const handleSetMovieData = (movieInfoArray) => {

    const updatedMovieData = movieInfoArray.map((movieInfo) => {

      const posterPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieInfo.poster_path}`;

      const newMovie = {
        id: movieInfo.id,
        title: movieInfo.original_title,
        poster_path: posterPath,

      };

      return newMovie;
    });

    setMovieData(updatedMovieData); // Assuming you have a state setter function called setMovieData
    // console.log("set Successful")

  };



  React.useEffect(() => {

    fetchMoviesForCarousel(props.randNumArray, props.nowPlaying, props.listSelector, handleSetMovieData);

   
  }, []);





  return (
    <div className="carousel-component-container">
      <h1 className="carousel-title">{props.carouselTitle}</h1>
      <Swiper
 
        centeredSlides={false}
        grabCursor={false}
        pagination={{
          clickable: true,
        }}
    
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) =>
          handleViewableSlideCountStateChange(swiper.activeIndex)


        }

        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 2.2,
            navigation:false,
        
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2.2,  
            navigation:false,   
         
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3.6,
            navigation:false,
          
          },
          840: {
            slidesPerView: 4.2,
            navigation:false,

        
           
          },

          1240: {
            slidesPerView: 3.8,
            navigation:true,
           
          
          },

          1440: {
            slidesPerView: 4.8,
            navigation:true,
      
        
          },

          1640: {
            slidesPerView: 5.6,
            navigation:true,
      
        
          },

          1840: {
            slidesPerView: 6.1,
            navigation:true,
         
         
            
          },

        }
        }


      >
      {movieData.map((movie, index) => (

        <SwiperSlide key={index}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            synopsis={movie.synopsis}
            runtime={movie.runtime}
            rating={movie.rating}
            genre={movie.genre}
            releaseDate={movie.release_date}
            cast={movie.cast}
            slideStateChange={handleViewableSlideCountStateChange}
            viewableSlideCount={viewableSlideCount}
          />
        </SwiperSlide>
      ))}

    </Swiper>
    </div >
  );
}