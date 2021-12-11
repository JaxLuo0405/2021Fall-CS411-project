import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SearchMoviePage from './components/SearchMoviePage';
import MovieToPlaylist from './components/MovieToPlaylist';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="search" element={<SearchMoviePage />} />
      {/* <Route path="search" element={<MovieToPlaylist />} /> */}
      <Route path="generate" element={<MovieToPlaylist />} /> 
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
