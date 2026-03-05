import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            {/* <h1>This is home</h1> */}
        </div>
    );
};

export default Home;