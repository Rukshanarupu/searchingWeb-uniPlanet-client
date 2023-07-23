import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CollegeSection = () => {
    const [colleges, setColleges] = useState([]);
    const {loading } = useContext(AuthContext);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/universities`)
      .then((res) => res.json())
      .then((result) => {
        const showLimitedColleges = result.slice(0, 3);
        setColleges(showLimitedColleges);
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
    const {image, name, admission_date, sports_facility, events_details, _id}=college || {}
    const warning = () => toast.error('You have to log in first to view details');

    return(
      <div className="card card-compact w-full bg-base-100 shadow-xl border-t-8 border-primary">
        <figure><img className="h-[200px]" src={image} alt="Shoes" /></figure>
        <div className="card-body">
          <div>
            <h2 className="card-title text-2xl">{name}</h2>
              <h3 className=" text-xl">Admission Date: <span className="text-amber-600">{ admission_date } </span></h3>
            <p className="text-lg">Sports Category: <span className="text-amber-600">{ sports_facility.category }</span></p>
          </div>
          <div className="flex gap-1 text-lg">
            <h3 className=""> Events details: </h3>
            <p className="text-amber-600">{ 
              events_details.map((event, _id) => (
                <div key={_id}>
                    <p>{event.title}</p>
                </div>
              ))}
            </p>
          </div>
          <div className="card-actions justify-end">
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

export default CollegeSection;
