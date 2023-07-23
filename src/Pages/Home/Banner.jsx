import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";


const Banner = () => {
    return (
        <div className='bg-teal-50 pb-5'>
            
            <div className='container mx-auto'>
                <div className=' grid md:grid-cols-2 gap-5 items-center'>
                <motion.div
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <h1 className="mb-5 text-5xl font-bold font-forum">We maximize your chance of getting admitted to your chosen universities</h1>
                    <p className="mb-5 text-2xl">The smart alternative to applying direct for a degree abroad and the easy way to find programs that match your eligibility and aspirations</p>
                    <Link to='./login' className="btn my-btn mb-3">Explore More</Link>
                </motion.div>
                <motion.div
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <img src="https://images.studee.com/illustrations/illustration__feature--homepage-hero.png?ixlib=js-2.3.2&auto=format&w=1152&crop=fit&q=30" className="w-[90%]" alt="" />
                </motion.div>
                </div>

                <div className='md:flex justify-between gap-10 lg:gap-24 bg-white p-5 px-10 border-s-4 border-primary shadow-xl mb-5 mt-10'>
                    <div className="form-control">
                        <label className="label">
                            <h1 className="label-text text-2xl">Location</h1>
                        </label>
                        <input type="text" placeholder="Enter a country, city or university" className="input border-secondary h-[55px] w-full lg:w-[400px]" />
                        
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-2xl">Subject</span>
                        </label>
                        <input type="text" placeholder="Enter your Subject" className="input border-secondary h-[55px] w-full lg:w-[400px]" />
                        
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-2xl text-white">submit</span>
                        </label>
                        <button className="btn border-secondary h-[55px] w-[150px] capitalize bg-primary hover:bg-secondary hover:text-black" > Fine Colleges</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
