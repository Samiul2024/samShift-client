import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';
import BrandSlider from '../../components/BrandSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
             <BrandSlider />
            {/* <h1>This is home</h1> */}
        </div>
    );
};

export default Home;