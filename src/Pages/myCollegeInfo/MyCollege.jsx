import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const MyCollege = () => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user.email)
    const [myColleges, setMyColleges] = useState([]);

    const url = `${import.meta.env.VITE_API_URL}/postedAdmissionInfo`;
    const fetchMyColleges = () => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMyColleges(data);
        })
        .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message to the user
        });
    };

    useEffect(() => {
        fetchMyColleges();
    }, [myColleges]);

    const filterByMail=myColleges?.filter(colleges=>user.email==colleges.email)
    console.log(filterByMail)

    if (loading) {
        return <LoadingSpinner />;
    }

    const handleDelete = (id) => {
        console.log(id)
        const proceed = confirm("Are You Sure you want to delete");
        if (proceed) {
          fetch(`${import.meta.env.VITE_API_URL}/myColleges/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
    
              if (data.deletedCount > 0) {
                Swal.fire("Deleted!", "Your Service has been deleted.", "success");
                const remaining = myColleges?.filter((myCollege) => myCollege._id !== id);
                setMyColleges(remaining);
              }
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col overflow-x-auto shadow-md sm:rounded-lg  min-w-full align-middle">
                <div className="inline-block overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr className="">
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Delete
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    College Name
                                </th>
                                <th scope="col" className="text-center py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                                    Number
                                </th>
                                <th scope="col" className="text-center py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                                    Subject
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {filterByMail?.map((myCollege) => (
                                // console.log(myCollege)
                                <MyCollegesTable
                                    key={myCollege._id}
                                    handleDelete={handleDelete}
                                    // handleToyUpdate={handleToyUpdate}
                                    myCollege={myCollege}
                                ></MyCollegesTable>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
        </div>
    );
};


const MyCollegesTable=({myCollege, handleDelete, })=>{
    console.log(myCollege)
    const {photo, name, subject, college, number, _id}=myCollege
    return (
        <tr>
            <th className="text-left">
                <button className="btn bg-secondary text-black hover:bg-primary btn-circle ml-5" onClick={() => handleDelete(_id)} >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </th>
            <td className="bg-gray-50 pl-4 flex gap-1 items-center">
                <div className="mask ">
                    {photo && <img className="rounded-full w-20 h-20" src={photo} alt="img" />}
                </div>
                {
                    name
                }
            </td>
            <td>{college} </td>
            <td className="text-center">{number}</td>
            <td className="text-center">{subject}</td>
            <td>
                <Link to={`/editInfo/${_id}`} className="btn my-btn">Edit</Link>
             </td>
            </tr>
    )
}

export default MyCollege;