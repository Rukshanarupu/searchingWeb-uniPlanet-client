import { AuthContext } from "../../Providers/AuthProviders";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useContext, useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init();

const Galleries = () => {
    useEffect(() => {
        // Initialize AOS with desired options
        AOS.init({ duration: 1000 }); 
    }, []);
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingSpinner />;
    }

  return (
    <div className="mb-10 py-5">
        
        <div className="container mx-auto">
            <div className="flex justify-between gap-10">
                <div className="bg-secondary p-[3px] w-[100%]"><img className="w-full h-[300px]" src="https://images.unsplash.com/photo-1627556704283-452301a45fd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="" /></div>
                <div className="">
                    <h2 data-aos="zoom-out" className="my-title">PHOTO GALLERY</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt eligendi tempora ducimus nostrum modi quia. Consectetur dignissimos odio rerum</p>
                </div>
            </div>
            <div  data-aos="fade-up" className="flex justify-between">
                <div></div>
                <div className="bg-secondary p-[3px] w-[50%] -mt-24"><img className="w-full h-[300px]" src="https://media.istockphoto.com/id/1366623793/photo/diverse-friends-group-takes-joyful-photo-after-graduation.webp?b=1&s=170667a&w=0&k=20&c=tN9CELWU7q3JhqxieFaxbkPZJka41JOxbF1UAY_TvtY=" alt="" /></div>
            </div>
            <div className="flex gap-10">
                <div data-aos="fade-right" className="w-[40%]">
                    <div className="bg-secondary p-[3px] w-[100%]"><img className="w-full h-[300px]" src="https://images.unsplash.com/photo-1627556704283-452301a45fd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="" /></div>
                    <div className="bg-secondary p-[3px] w-[100%]"><img className="w-full h-[300px]" src="https://images.unsplash.com/photo-1627556704283-452301a45fd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="" /></div>
                </div>
                <div data-aos="fade-left" className="bg-secondary p-[3px]"><img className="w-full h-[300px]" src="https://images.unsplash.com/photo-1627556704283-452301a45fd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="" /></div>
                <div></div>
            </div>
        </div>
    </div>
        
    );
};


export default Galleries;