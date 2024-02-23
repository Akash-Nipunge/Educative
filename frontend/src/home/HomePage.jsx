import React from 'react';
import NavHome from './NavHome';
import {ImageSlider} from './ImageSlider';
import Footer from './Footer';
import EventSlider from './EventSlider';
import Working from './Working';
import FeedbackCard from './FreedbackForm';

const HomePage = () => {
  return (
    <div>
      <NavHome />
      <ImageSlider />
      <EventSlider/>
      <Working/>
      <FeedbackCard/>
      <Footer/>
        </div>
  );
};

export default HomePage;
