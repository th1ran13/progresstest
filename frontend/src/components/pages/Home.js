import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import HeroSection from '../HeroSection';
import Cards from '../Cards';

export default function Home() {
  return (
    <>
    <div className = 'home'>
       <HeroSection />
    </div>    
     
      {/* <h1 className='home'>SEED</h1> */}
      <Cards />
      <Footer />
    </>
  );
}
