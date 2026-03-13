import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';
import BrandSlider from '../../components/BrandSlider';
import Benefits from '../../components/Benefits';
import BeMerchant from '../../components/BeMerchant';
import Faq from '../../components/Faq';
import HowItWorks from '../../components/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks />
            <ServicesSection></ServicesSection>
            <BrandSlider />
            <Benefits />
            <BeMerchant />
            <Faq />
        </div>
    );
};

export default Home;