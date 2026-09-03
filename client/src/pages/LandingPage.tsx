import React from 'react';
import Hero from '../components/Hero';
import TechStrip from '../components/TechStrip';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import AgenticSection from '../components/AgenticSection';
import GrowthLoop from '../components/GrowthLoop';
import CTA from '../components/CTA';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TechStrip />
      <HowItWorks />
      <Features />
      <AgenticSection />
      <GrowthLoop />
      <CTA />
    </div>
  );
};

export default LandingPage;
