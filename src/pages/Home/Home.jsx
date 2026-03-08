import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';
import BrandSlider from '../../components/BrandSlider';
import Benefits from '../../components/Benefits';
import BeMerchant from '../../components/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <BrandSlider />
            <Benefits />
            <BeMerchant />
        </div>
    );
};

export default Home;