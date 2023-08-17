import React from "react";
import MovieCard from "../components/MovieCard"
import movieData from "../data.json"
import axios from "axios";
import tmdbConfig from "../tmdb.json"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Carousel(props) {

  //API Call to TMDB

  const [movieData, setMovieData] = React.useState([]);
  const apiKey = tmdbConfig.apiKey;


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

    const randNumArray = props.randNumArray;
    const nowPlaying = props.nowPlaying;
    const listSelector = props.listSelector;

    if (nowPlaying === true) {

      const fetchData = async () => {
        try {
          const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${listSelector}?api_key=${apiKey}`);

          // Assuming both APIs return data in the form of { data: ... }
          const responseMovieInfo = movieInfo.data.results;

          // Merge the data from both responses into the same object
          const mergedData = responseMovieInfo.slice(0, 10);

          handleSetMovieData(mergedData);
        } catch (error) {
          // Handle any errors that may occur during the API calls
          console.error('Error fetching data:', error);
          return null; // Or handle the error appropriately
        }
      };

      fetchData();

      return;

    }




    const fetchData = async (index) => {
      try {
        const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${index}?api_key=${apiKey}`);
        const castInfo = await axios.get(`https://api.themoviedb.org/3/movie/${index}/credits?api_key=${apiKey}`);



        // Assuming both APIs return data in the form of { data: ... }
        const responseMovieInfo = movieInfo.data;
        const responseCastInfo = castInfo.data;

        // Merge the data from both responses into the same object
        const mergedData = {
          ...responseMovieInfo,
          ...responseCastInfo,
        };



        return mergedData;
      } catch (error) {
        // Handle any errors that may occur during the API calls
        console.error('Error fetching data:', error);

        if (error.response.status === 404) {

          return fetchData(Math.random() * (1000 - 1) + 1);

        }

        return null; // Or handle the error appropriately
      }
    };

    const fetchAllData = async () => {
      const mergedDataArray = [];

      for (const index of randNumArray) {
        const mergedData = await fetchData(index);
        if (mergedData) {
          mergedDataArray.push(mergedData);
        }
      }


      handleSetMovieData(mergedDataArray);
    };

    fetchAllData();
  }, []);



  const [viewableSlideCount, setViewableSlideCount] = React.useState(6.5);

  const handleViewableSlideCountStateChange = (updatedValue) => {

    setViewableSlideCount(updatedValue);
  }

  const slidesPerPage = 6.4;

  function formatRuntime(time) {

    if (typeof time !== 'number') {
      throw new Error('Invalid input: time should be a number.');
    }

    if (time < 0) {
      throw new Error('Invalid input: time should be a non-negative number.');
    }

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    // You can customize the output format as needed
    const formattedRuntime = `${hours}h ${minutes}m`;

    return formattedRuntime;


  }

  // console.log(movieData)

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