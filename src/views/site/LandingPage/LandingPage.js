import React from 'react';
import {
  Navbar,
  InterestsView,
  Schedule,
  Meetings,
  HelpSectionView,
  Pricings,
  IntegrationsView,
  SocialProofView,
  FaqsView,
  Footer,
} from './Components';

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <InterestsView />
      <Schedule/>
      <Meetings/>
      <HelpSectionView/>
      <Pricings />
      <IntegrationsView />
      <SocialProofView />
      <FaqsView />
      <Footer />
    </div>
  );
};

export default LandingPage;
