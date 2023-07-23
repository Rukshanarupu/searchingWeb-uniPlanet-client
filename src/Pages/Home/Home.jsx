// import React from 'react';
import Banner from './Banner';
import Galleries from './Galleries';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import CollegeSection from './CollegeCard/CollegeSection';

AOS.init();

const Home = () => {
    useEffect(() => {
        // Initialize AOS with desired options
        AOS.init({ duration: 1000 }); 
    }, []);
    
    return (
        <div className=''>
            {/* Banner start here */}
            <Banner></Banner> 

            {/* college section */}
            <CollegeSection></CollegeSection>
            
            {/* about section */}
            <section className='container mx-auto grid md:grid-cols-2 gap-10 items-center'>
                <div className='relative mb-10'>
                    <div className='p-10 shadow-2xl rounded'>
                    <h1 className='text-4xl mb-2 font-bold'>Find your best matches</h1>
                    <p>Answer a few simple questions to get a tailored list of the programs that best match your needs</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h4 className='my-title' data-aos="fade-up">About us</h4>
                        <h2 className='text-6xl font-bold' data-aos="fade-left">Find & apply for your <span className='text-primary'>Best Colleges</span></h2>
                        <h2 className='text-3xl font-semibold my-5' data-aos="zoom-in">Customers’ favorite products this week.</h2>
                        <p data-aos="fade-up">We maximize your chance of getting admitted to your chosen universities. Reduced application fees, a free assessment and access to a dedicated advisor.</p>
                    </div>
                    <Link to="/contact" className='btn my-btn mt-5'>How uniPlanet Help you</Link>
                </div>
            </section>

            {/* Gallery section start here */}
            <Galleries></Galleries>            
        </div>
    );
};

export default Home;