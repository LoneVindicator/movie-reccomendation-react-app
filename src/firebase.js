// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, update, get } from "firebase/database";
import React, { useState } from 'react';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS6c4IE-poaQtGRDrYems8CT7sbKCIArc",
  authDomain: "movie-reccomendation-react-app.firebaseapp.com",
  databaseURL: "https://movie-reccomendation-react-app-default-rtdb.firebaseio.com",
  projectId: "movie-reccomendation-react-app",
  storageBucket: "movie-reccomendation-react-app.appspot.com",
  messagingSenderId: "966044605466",
  appId: "1:966044605466:web:926d42bdfc184c2d3185a3",
  measurementId: "G-R5JDVVNC38"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Get a reference to the Realtime Database
const database = getDatabase();

// Function to save userId and email tso the database
const saveUserDataToDatabase = (userId, email) => {
  // Define the path where you want to store the data in the database
  const userRef = ref(database, `users/${userId}`);

  // Set the data (userId and email) in the database
  set(userRef, { userId, email })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
};

// Function to toggle the favorite status for a movie
const toggleMovieFavorite = (userId, movieId, isFavorite) => {
  // Get a reference to the user's favorites in the Realtime Database
  const favoritesRef = ref(database, `users/${userId}/favorites`);

  // Use update() to toggle the favorite status for the movie
  update(favoritesRef, { [movieId]: isFavorite })
    .then(() => {
      console.log("Movie favorite status updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating movie favorite status:", error);
    });
};

const isMovieFavorited = async (userId, movieId) => {
  // Get a reference to the user's favorites in the Realtime Database
  const favoritesRef = ref(database, `users/${userId}/favorites`);

  try {
    // Use get() to fetch the user's favorites data
    const snapshot = await get(favoritesRef);

    // Check if the movieId exists in the user's favorites data
    if (snapshot.exists()) {
      const favoritesData = snapshot.val();
      return favoritesData[movieId] === true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching favorites data:", error);
    return false;
  }
};

//

const getFavoriteMovieIds = async (userId) => {
  const favoritesRef = ref(database, `users/${userId}/favorites`);

  try {
    const snapshot = await get(favoritesRef);

    if (snapshot.exists()) {
      const favoritesData = snapshot.val();
      const favoriteMovieIds = [];

      for (const [movieId, isFavorite] of Object.entries(favoritesData)) {
        if (isFavorite === true) {
          favoriteMovieIds.push(movieId);
        }
      }

      return favoriteMovieIds;
    } else {
      return []; // Return an empty array if the favorites data doesn't exist
    }
  } catch (error) {
    console.error("Error fetching favorites data:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};



export { auth, saveUserDataToDatabase, toggleMovieFavorite, isMovieFavorited, getFavoriteMovieIds };
