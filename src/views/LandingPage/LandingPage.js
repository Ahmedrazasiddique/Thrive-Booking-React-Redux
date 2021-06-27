import React from 'react';
import Navbar from '../../components/Navbar';
import Schedule from '../../components/Schedule';
import Meetings from '../../components/Meetings';
import {HelpSectionView} from './components';

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <Schedule/>
      <Meetings/>
      {/*<HelpSectionView/>*/}
    </div>
  );
};

export default LandingPage;
