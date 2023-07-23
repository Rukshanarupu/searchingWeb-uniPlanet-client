

import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import LoadingSpinner from "./Shared/LoadingSpinner";

const Colleges = () => {
    const [colleges, setColleges] = useState([]);
    const {loading } = useContext(AuthContext);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/universities`)
      .then((res) => res.json())
      .then((result) => {
        setColleges(result);
      });
    }, []);
  
    if (loading) {
        return <LoadingSpinner />;
    }

    console.log(colleges)

    return (
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-7 my-5">
            {colleges?.map((college, _id) => (
              <College key={_id} college={college}></College>
            ))}
          </div>
        </div>
    );
};

const College =({college})=>{
    const {user } = useContext(AuthContext);
    console.log(college)
    const {image, name, admission_date, number_of_research, research_history, _id, college_rating}=college || {}
    const warning = () => toast.error('You have to log in first to view details');

    return(
      <div className="card card-compact w-full bg-base-100 shadow-xl border-t-8 border-primary">
        <figure><img className="h-[200px]" src={image? image: "https://i.ibb.co/2gPW46X/university-alpha-college.jpg"} alt="Shoes" /></figure>
        <div className="card-body">
          <div>
            <h2 className="font-bold text-3xl mb-5">{name}</h2>
              <h3 className=" text-xl">Admission Date: <span className="text-amber-600">{ admission_date } </span></h3>
            <p className="text-lg">Rating: <span className="text-amber-600">{ college_rating }</span></p>
            <p className="text-lg">Number of research: <span className="text-amber-600">{ number_of_research }</span></p>
            <p className="text-lg">Research history: <span className="text-amber-600 text-[15px]">{ research_history }</span></p>
            
          </div>
          <div className="card-actions justify-center">
            {
              user ?
              <Link to={`/details/${_id}`} className="btn my-btn">View details</Link>:
              <Link onClick={warning} className="btn my-btn">View details</Link>
  
            }
          </div>
        </div>
      </div>
    )
  }

export default Colleges;