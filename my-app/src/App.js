import React from 'react';
import './App.css';
import Map from './Map';
import Navbar from './Navbar';
import "./styles.css";
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import About from './pages/About';

function App() {
  let pages;
  switch (window.location.pathname) {
    case "/":
      pages = <Home />;
      break;
    case "/Page1":
      pages = <Page1 />;
      break;
    case "/Page2":
      pages = <Page2 />;
      break;
    case "/Page3":
      pages = <Page3 />;
      break;
    case "/About":
      pages = <About />;
      break;
    default:
      pages = <Home />; // Or a "Not Found" page
      break;
  }

  return (
    <>
      <Navbar />

      <div className="container">
        {pages}
      </div>
    </>
  );
}

export default App;
