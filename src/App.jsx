import React from 'react';
import {Routes, Route} from 'react-router-dom';

// My imports
import Home from './pages/Home';
import ScrollToTop from './components/layout/ScrollToTop';
import Navbar from './components/layout/Navbar';
function App() {
  return (
    <>
    <div
      data-scroll-container
      className='mainDiv bg-white relative font-Poppins
      '
      >

      <Navbar/>
      <ScrollToTop />

      {/* <div className="min-h-screen w-full bg-white relative"> */}
        {/* Teal Glow Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)
            `,
            backgroundSize: "100% 100%",
          }}
        />
        {/* Your Content/Components */}
      {/* </div> */}

      <div className='relative z-10'>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>

    </div>
    </>
  )
}

export default App
