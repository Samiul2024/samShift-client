import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';
import BrandSlider from '../../components/BrandSlider';
import Benefits from '../../components/Benefits';
import BeMerchant from '../../components/BeMerchant';
import Faq from '../../components/Faq';
import HowItWorks from '../../components/HowItWorks';
import Testimonials from '../../components/Testimonials';
import HowEarningWorks from '../../components/HowEarningWorks';
import TopAgents from '../../components/TopAgents';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks />
            <ServicesSection></ServicesSection>
            <BrandSlider />
            <Benefits />
            <BeMerchant />
            <Testimonials />
            <Faq />
            <HowEarningWorks />
            <TopAgents />

        </div>
    );
};

export default Home;