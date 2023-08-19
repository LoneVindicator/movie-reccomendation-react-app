

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

function getRandomNumber(max, min) {

    return Math.random() * (max - min) + min;
}


function fetchRandomMoviesForCarousel(axios, apiKey, handleSetMovieData){

    const fetchData = async () => {
        try {

            let randomNumber = getRandomNumber(1000, 1);

            const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${randomNumber}?api_key=${apiKey}`);
            const castInfo = await axios.get(`https://api.themoviedb.org/3/movie/${randomNumber}/credits?api_key=${apiKey}`);

            // Assuming both APIs return data in the form of { data: ... }
            const responseMovieInfo = movieInfo.data;
            const responseCastInfo = castInfo.data;

            // Merge the data from both responses into the same object
            const mergedData = {
                ...responseMovieInfo,
                ...responseCastInfo,
            };

            handleSetMovieData(mergedData);

        } catch (error) {
            // Handle any errors that may occur during the API calls
            console.error('Error fetching data:', error);

        }
    };

    fetchData();


}

    //Create an array of object the movie's info

   

export { formatRuntime, getRandomNumber, fetchRandomMoviesForCarousel};
