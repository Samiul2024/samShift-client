import React from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCentres = useLoaderData();
    // console.log(serviceCentres);
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">

            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-10">
                We are available in 64 districts
            </h1>

            {/* Map */}
            <CoverageMap serviceCentres={serviceCentres}/>

        </div>
    );
};

export default Coverage;