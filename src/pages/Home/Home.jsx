import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';
import BrandSlider from '../../components/BrandSlider';
import Benefits from '../../components/Benefits';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <BrandSlider />
            <Benefits />
            {/* <h1>This is home</h1> */}
        </div>
    );
};

export default Home;