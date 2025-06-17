
import React from 'react';
import Layout from '@/components/layout/Layout';
import AboutIntro from '@/components/about/AboutIntro';
import ValueProposition from '@/components/about/ValueProposition';
import TeamSection from '@/components/about/TeamSection';
import PressReleases from '@/components/about/PressReleases';
import AboutCTA from '@/components/about/AboutCTA';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <AboutIntro />
        <ValueProposition />
        <TeamSection />
        <PressReleases />
        <AboutCTA />
      </div>
    </Layout>
  );
};

export default AboutPage;
