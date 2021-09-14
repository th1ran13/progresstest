import React from 'react';
import '../../App.css';
import Help2 from '../Help2';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchBar from '../SearchBar';
import BookData from "../Data.json";
import Footer from '../Footer'; 

export default function Products() {
  return(
    <Router>
      <div>
      <SearchBar placeholder="Search for a question" data={BookData}/>  
    <><Help2/></>
    </div>
    
    <Footer/>
    </Router>
  )
}
