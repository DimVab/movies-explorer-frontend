import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Menu from '../Menu/Menu';

function App() {


  return (
    <><Routes>
      <Route path="/" element={<Main loggedIn={false} />}/>
    </Routes>

    <Menu isOpened={false} currentPage="menu" /></>
  );
}

export default App;
