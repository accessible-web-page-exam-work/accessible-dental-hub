import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { AccessibilityInfo } from '@/components/home/AccessibilityInfo';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <AccessibilityInfo />
    </Layout>
  );
};

export default Index;
