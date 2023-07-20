import React from "react";
import MovieCard from "../components/MovieCard"
import movieData from "../data.json"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Carousel(props) {

  const [viewableSlideCount, setViewableSlideCount] = React.useState(6.5);

  const handleViewableSlideCountStateChange = (updatedValue) => {

    setViewableSlideCount(updatedValue);
  }

  const slidesPerPage = 6.4;

  return (
    <div className="carousel-component-container">
      <h1 className="carousel-title">{props.carouselTitle}</h1>
      <Swiper
        slidesPerView={slidesPerPage}
        slidesPerGroup={slidesPerPage}
        centeredSlides={false}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) =>
          handleViewableSlideCountStateChange(swiper.activeIndex)
        }


      >
        {movieData.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              movieName={movie.movieName}
              imgLink={movie.imgLink}
              landscapeImgLink={movie.landscapeImgLink}
              desc={movie.desc}
              castMembers= {movie.castMembers}
              slideStateChange={handleViewableSlideCountStateChange}
              viewableSlideCount={viewableSlideCount}
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}