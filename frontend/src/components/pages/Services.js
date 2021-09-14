import React from 'react';
import '../../App.css';
import AddInquiry from '../AddInquiry';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from '../Footer';
import SearchBar from '../SearchBar';
import BookData from "../Data.json";
import FQuestions from '../FQuestions';

export default function Services() {
  
  return(
    <Router>
    <div>
      <SearchBar placeholder="Search for a question" data={BookData}/>
      <Route path="/add" exact component={AddInquiry}/>
      <AddInquiry/><br></br>
      <FQuestions/>
    </div>
    
    <Footer/>
    </Router>
  )
}
