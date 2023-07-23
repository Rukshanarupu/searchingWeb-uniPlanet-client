
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";
import { useContext, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaAngleRight } from "react-icons/fa";

const AdmissionForm = () => {

    const { user , loading} = useContext(AuthContext);
    const [dob, setDob] = useState('');
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
  
    const handleChange = (e) => {
      setDob(e.target.value);
    };
  
    if (loading) {
      return <LoadingSpinner />;
  }
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const name = form.name.value;
      const email = user?.email;
      const image = form.image.files[0]
      const subject = form.subject.value;
      const number = form.number.value;
      const address = form.address.value;
  
      const formData = new FormData();
      formData.append('image', image)
      fetch(img_hosting_url, {
          method: 'POST',
          body: formData
      })
      .then(res => res.json())
      .then(imgResponse => {
          if(imgResponse.success){
              const imgURL = imgResponse.data.display_url;
              const candidate = {
              name: name,
              email: email,
              photo: imgURL,
              subject: subject,
              number: number,
              address: address,
              dob: dob
              };
              console.log(candidate);
              
  
              fetch(`${import.meta.env.VITE_API_URL}/postedAdmissionInfo`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(candidate),
                })
                  .then((res) => res.json())
                  .then((data) => {
                      setUploadButtonText('Uploaded!')
                      console.log(data);
                      if (data.insertedId) {
                          Swal.fire({
                              title: "Success!",
                              text: "College added Successfully",
                              icon: "success",
                              confirmButtonText: "Cool",
                          });
                      }
                  });
          }
      })
      
     
    };
  
    const handleUploadImage = image => {
      // console.log(image)
      setUploadButtonText(image.name)
    }

    return (
        <div className="mt-16 container mx-auto">
          <div className="grid md:grid-cols-2">
            <div className="bg-[#1f4363] text-white text-center p-10">
                <h2 className="text-[62px]">Request an Admission</h2>
                <p>Fusce purus mauris, blandit vitae purus eget, viverra volutpat nibh. Nam in elementum nisi, a placerat nisi. Quisque ullamcorper magna in odio rhoncus semper.Sed nec ultricies velit. Aliquam non massa id enim ultrices aliquet a ac
                    tortor.
                </p>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                <p className="pt-7 text-[#83969b] text-[48px]">Help Line <span>+010 4561 32145</span> </p> 
                <FaAngleRight></FaAngleRight>
            </div>
            
          <form onSubmit={handleSubmit} className="bg-[url(https://rn53themes.net/themes/demo/education-master/images/weather.png)]">
            <div className="p-10">
              <div className="flex gap-4 items-center my-5">
                <span className="text-lg w-[125px]">Full Name: </span>
                <input type="text" placeholder="Your name" name="name" defaultValue={user?.displayName} className="input input-bordered w-[70%]"/>
              </div>
                <div className="flex gap-4 items-center mb-5">
                    <span className="text-lg w-[125px]">User Email</span>
                    <input type="email" placeholder="email" name="email" defaultValue={user?.email} className="input input-bordered w-[70%]"/>
                </div>
                <div className="flex gap-4 items-center mb-5">
                    <span className="text-lg w-[125px]">Your Subject:</span>
                <input type="text" placeholder="Your favorite subject" name="subject" className="input input-bordered w-[70%]"/>
              </div>
                <div className="flex gap-4 items-center mb-5">
                    <span className="text-lg">Phone Number:</span>
                    <input type="number" name="number" placeholder="Enter your phone number" className="input input-bordered w-[70%]" />
                </div>
                <div className="flex gap-4 items-center mb-5">
                    <span className="text-lg w-[125px]">Your Address:</span>
                    <input type="text" name="address" placeholder='Enter your address' className="input input-bordered w-[70%]" />
                </div>
                <div className="flex gap-4 items-center mb-5">
                    <span className="text-lg w-[125px]">Date of Birth:</span>
                    <input type="date" id="dob" name="dob" value={dob} onChange={handleChange} className="input input-bordered w-[70%]"/>
                </div>
                <div className="flex gap-4 items-center mb-5">
                    <span className="text-lg w-[125px]">Your Image:</span>
                    <label>
                      <input
                        onChange={event => {
                          handleUploadImage(event.target.files[0])
                        }}
                        className='text-sm cursor-pointer w-36 hidden' type='file' name='photo' id='image' accept='image/*' hidden
                      />
                      <div className='text-gray-400 border border-gray-300 rounded-lg cursor-pointer p-2.5'>
                        {uploadButtonText}
                      </div>
                    </label>
                </div>
                <div className="form-control">
                <input className="btn bg-secondary hover:bg-primary border-0 text-black" type="submit" value="Apply Now"/>
                </div>
            </div>
          </form>
          </div>
        </div>
    );
};

export default AdmissionForm;