import { useContext, useState } from "react";
import { FaHeart, FaStar, FaStarHalf } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from "../../../Providers/AuthProviders";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const CollegeCardDetails = () => {
    const { loading } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const detailsLoaded = useLoaderData();
    console.log(detailsLoaded)
    
    const {image, name, college_rating,  admission_date , admission_process, number_of_research, sports_facility, events_details, research_works}=detailsLoaded
    
    const renderStars = () => {
        const fullStars = Math.floor(college_rating);
        const hasHalfStar = college_rating % 1 !== 0;        
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(<FaStar/>);
        }  

        if (hasHalfStar) {
          stars.push(<FaStarHalf/>);
        }   
        return stars;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    // favorite btn function
    const handleFavoriteClick = () => {
        setIsFavorite(true);
        toast.success('This recipe is now your favorite!');
    };
    return (
        
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-10 mx-auto">
                <div className="lg:w-4/5 mx-auto md:flex flex-wrap">
                    <img alt="education" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={image ? image :"https://i.ibb.co/S3Vrxz7/product-4.jpg"}/>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">College Name</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">Rating: {renderStars()}</span>
                        </div>
                        <div className="">
                            <p><span className="font-bold">Admission date:</span> {admission_date}</p>
                            <p className="leading-relaxed"><span className="font-bold">Admission process:</span> {admission_process}</p>
                        </div>
                        <div className=" my-3">
                            <h3 className=""> <span className="font-bold">Sports Category:</span> {sports_facility.category}</h3>
                            <div className="flex gap-1"> 
                                <p className="font-bold">Sports Facilities: </p>
                                <p className="text-amber-600">{ 
                                    sports_facility.facilities.map((facility, _id) => (
                                        <div key={_id}>
                                            <p>{facility}</p>
                                        </div>
                                    ))}
                                </p>
                            </div>  
                        </div>
                        <div className='flex justify-between'>
                            <button disabled={isFavorite} onClick={handleFavoriteClick} className='my-btn flex items-center hover:text-black'>
                                <FaHeart></FaHeart>
                                <span className='ml-1'>
                                    {isFavorite ? 'Favorite' : 'Mark as Favorite'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="mb-5">
                        <h1 className="text-3xl font-semibold">Top trending <span className="text-yellow-500">Research</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, ullam. Dolorum repellat veniam sed iusto tempore voluptate amet error nisi.</p>
                        <p><span className="font-bold">Number of research:</span> {number_of_research}</p>
                    </div>
                    <div className="mt-5">
                        { 
                            research_works.map((research, _id) => (
                                <div key={_id} className="bg-blue-50 shadow-lg mb-3 py-2 px-10">
                                    <h1 className="text-xl">{research.title}</h1>
                                    <p className="text-yellow-500">Duration: {research.duration}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-semibold">College <span className="text-yellow-500">Events</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum debitis eos magnam tempora saepe voluptatum, facere possimus unde. A blanditiis minima commodi impedit. Dicta similique, laborum quos quod nam repudiandae!</p>

                    <div className="mt-5">{ 
                        events_details.map((event, _id) => (
                            <div key={_id} className="flex gap-5 w-full bg-sky-100 mb-5">
                                <h1 className="bg-sky-700 text-white w-[180px] text-3xl p-3">{event.date}</h1>
                                <div>
                                    <h2 className="text-lg font-semibold">{event.title}</h2>
                                    <p>{event.description}</p>
                                </div>
                            <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};



export default CollegeCardDetails;
