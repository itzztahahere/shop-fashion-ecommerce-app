import React from 'react';

import CustomCarousel from '../components/HeroSection';
import EditorsPick from '../components/EditorsPick';
import Featured from '../components/Featured';
const Home = () => {

    return (
        <>
            <CustomCarousel
                heading="NEW COLLECTION"
               description="We know how large objects will act,<br /> but things on a small scale."
                buttonText="SHOP NOW"
                image="/images/heroimage.jpg"
            />
            <EditorsPick />
            <Featured />
        </>
    )
}

export default Home