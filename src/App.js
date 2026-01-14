import './App.css';
import Navbar from './components/Navbar';
import News from './components/News'
import LoadingBar from "react-top-loading-bar";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import React, { useState } from 'react'

const App = () => {

  const [progress, setProgress] = useState()


  const apikey = process.env.REACT_APP_API_KEY
  const pageSize = 6


  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} apikey={apikey} key='general' pageSize={pageSize} country='us' category='general' />} />
          <Route exact path='/business' element={<News setProgress={setProgress} apikey={apikey} key='business' pageSize={pageSize} country='us' category='business' />} />
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apikey={apikey} key='entertainment' pageSize={pageSize} country='us' category='entertainment' />} />
          <Route exact path='/general' element={<News setProgress={setProgress} apikey={apikey} key='general' pageSize={pageSize} country='us' category='general' />} />
          <Route exact path='/health' element={<News setProgress={setProgress} apikey={apikey} key='health' pageSize={pageSize} country='us' category='health' />} />
          <Route exact path='/science' element={<News setProgress={setProgress} apikey={apikey} key='science' pageSize={pageSize} country='us' category='science' />} />
          <Route exact path='/sports' element={<News setProgress={setProgress} apikey={apikey} key='sports' pageSize={pageSize} country='us' category='sports' />} />
          <Route exact path='/technology' element={<News setProgress={setProgress} apikey={apikey} key='technology' pageSize={pageSize} country='us' category='technology' />} />
        </Routes>
      </Router>
    </>
  )

}

export default App
