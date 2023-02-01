import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';
// 84307e60
const API_Url='http://www.omdbapi.com?apikey=84307e60'
// we are now using use effect hook to show this api data as soon  as the page loads!
const movie1={
  "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
  "Year": "2016",
  "imdbID": "tt18689424",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BN2I4OTllM2MtMWVhNC00MjkzLWJlMDUtN2FhMGQ2ZGVjMjllXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
}

const App = () => {
  const [movies,setMovies]=useState([]);
  const [search,setSearch]=useState('');

  const searchMovies=async (title)=>{
    const response=await fetch(`${API_Url}&s=${title}`)
    const data=await response.json();
    setMovies(data.Search);
    
  }
  useEffect(()=>{
    document.addEventListener('keydown',detectKeyPress,true)
  },[])
  
  const detectKeyPress=(e)=> {
    console.log("clicked", e.key)
  }
 
  useEffect(()=>{
    searchMovies('superman')

  },[])
  return (
    <div className="app">
      <h1>MovieTime</h1>

      <div className="search">
        <input type="text" placeholder='search for movies' value={search}
        onChange={(e) =>setSearch(e.target.value)}
       
        />
        <img src={SearchIcon}
         alt="search"  
         onClick={()=> searchMovies(search)} onKeyUp={(e) => setSearch(e.target.value)}
         />
      </div>

      {
        movies?.length > 0 
        ? (
          <div className="container">
            {movies.map((movie)=>(
              <MovieCard movie={movie}/>
             ))}
          </div>
          )
         :
        (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )
      }
     
    </div>
  )
}
  export default App;