import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Menu from '../Menu/Menu';

function App() {


  return (
    <><Routes>
      <Route path="/" element={<Main loggedIn={true} />}/>
      <Route path="/movies" element={<Movies loggedIn={true} isLoading={true} />}/>
    </Routes>

    <Menu isOpened={false} currentPage="menu" /></>
  );
}

export default App;
