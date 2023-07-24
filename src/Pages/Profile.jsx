import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import LoadingSpinner from "./Shared/LoadingSpinner";


const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    console.log(user)
    const [myColleges, setMyColleges] = useState([]);

    const url = `${import.meta.env.VITE_API_URL}/postedAdmissionInfo`;

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMyColleges(data);
        })
        .catch((error) => {
        console.error("Error fetching data:", error);
        });
    }, []);

    
    if (loading) {
        return <LoadingSpinner />;
    }

    const {displayName, email, photoURL}=user 
    const {_id, subject, college, address, bob, number}=myColleges
    return (
        <div className="grid md:grid-cols-2 gap-5 md:gap-10 lg:gap-24 container mx-auto">
            <div className="text-center">
                <div className="relative shadow-lg border-2 border-primary z-10">
                    <img src={photoURL} alt="user"/>
                </div>
                <div className="bg-white p-5 shadow-xl border-2 border-[#f3f2f2]">
                    <h4 className="text-3xl font-semibold">{displayName}</h4>
                    <h3 className="text-md">{email}</h3>
                    <ul className="flex justify-center items-center gap-3 mt-4">
                        <li><a href="#!"><FaFacebook/></a></li>
                        <li><a href="#!"><FaGoogle/></a></li>
                        <li><a href="#!"><FaTwitter/></a></li>
                    </ul>
                </div>
            </div>
            <div className="py-10 px-5 relative overflow-hidden ">
                <div className="relative overflow-hidden mb-7 bg-white p-5 rounded shadow-xl border-1 border-white udb-prof">
                    <h4 className="font-bold text-yellow-700"> My Profile</h4>
                    <p className="my-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed
                        to using Content here, content here, making it look like readable English.</p>
                    <div className="sdb-tabl-com sdb-pro-table">
                        <table className="responsive-table bordered">
                            <tbody>
                                <tr>
                                    <td>Student Name</td>
                                    <td>:</td>
                                    <td>{displayName}</td>
                                </tr>
                                <tr>
                                    <td>Eamil</td>
                                    <td>:</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>
                                        {/* {
                                        number.map(num=>(
                                            <p key={num._id}>{num}</p>)
                                        )
                                        } */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of birth</td>
                                    <td>:</td>
                                    <td>{bob}</td>
                                </tr>
                                <tr>
                                    <td>College Name</td>
                                    <td>:</td>
                                    <td>{college}</td>
                                </tr>
                                <tr>
                                    <td>Subject</td>
                                    <td>:</td>
                                    <td>{subject}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>{address}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="sdb-bot-edit">
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters</p>
                            <a href="#" className="bg-[#2f4f73] text-[12px] relative cursor-pointer inline-block overflow-hidden align-middle z-1 transition ease-in-out delay-150 h-[54px] no-underline align-center "><i className="fa fa-pencil"></i> Edit my profile</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;