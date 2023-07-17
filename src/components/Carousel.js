import React from "react";
import MoviePoster from "../images/carousel-movie-poster.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Carousel(props) {


    // const [showSlide, setShowSlide] = React.useState(false);
    // const [isHovered, setIsHovered] = React.useState(false);


    // function expandSlide() {

    //     setShowSlide(showSlide ? false : true);
    //     setIsHovered(isHovered ? false : true);
    // }

    return (

        <div className="carousel-component-container">

            <h1 className="carousel-title">{props.carouselTitle}</h1>

            <Swiper
                slidesPerView={2.5}
                centeredSlides={false}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[]}
                className="mySwiper"
            >
                <SwiperSlide>

                    <div className="carousel-card-container">

                        <div className="carousel-image-container">

                            <img className="carousel-movie-poster" src={MoviePoster}></img>

                            <div className="carousel-movie-title-container" >

                                <h1 className="carousel-movie-title hover">Batman Begins</h1>


                            </div>


                        </div>



                        <div className="carousel-card-info-container">

                            <h1 className="carousel-card-info-text carousel-movie-info">TV-MA · 2004 · 1h 35m </h1>
                            <h1 className="carousel-card-info-text carousel-movie-desc">
                                After witnessing his parents' death, Bruce learns the art of fighting to confront injustice.
                                When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.
                            </h1>

                        </div>


                    </div>



                </SwiperSlide>



            </Swiper>



        </div>




    )
}