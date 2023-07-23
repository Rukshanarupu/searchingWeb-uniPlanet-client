import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
    const {createUser}=useContext(AuthContext)
    const [error, setError]=useState('')
    const [success, setSuccess]=useState('')
    const [accepted, setAccepted] = useState(false);
    const navigate =useNavigate()
    const location = useLocation()

    const from =location.state?.from?.pathname || '/login'

    const handleSignUp=event=>{
        event.preventDefault()
        const form=event.target
        const name=form.name.value
        const email=form.email.value
        const photo=form.photo.value
        const password=form.password.value
        const confirmPassword=form.confirmPassword.value
        console.log(name, email, password, confirmPassword, photo)

        setSuccess('')
        setError('')    
        // validation
        if(password !== confirmPassword){
            setError('Password does not match')
            return
        }   
        if(password.length < 6){
            setError('Your password should be at least 6 characters or more')
            return
        }
        if(!/(?=.*[A-Z])/.test(password)) {
            setError('Please input at least one uppercase')
            return
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please input at least two numbers')
            return
        }
        
        createUser(email, password)
        .then(result=>{
            const createUser = result.user;
            console.log(createUser);
            updateProfile(createUser, {
                displayName: name, photoURL: photo
            })
            .then(() => {})
            .catch((error) => {});
            form.reset()
            setSuccess('You have been created successfully')
            navigate(from, {replace: true})            
            window.location.reload(ture)
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            setError(errorMessage)
        });
    }

    const handleAccepted = event =>{
        setAccepted(event.target.checked)
    }

    return (
        <section className="mt-12 mb-6">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="bg-white alert alert-error">
                        <div>
                            <span className="text-red-500">{error}</span>
                            <span><p className='text-green-700 mt-3'>{success}</p></span>
                        </div>
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign Up to your account</h1>
                        <form onSubmit={handleSignUp}  className="space-y-4 md:space-y-6">
                            <div className="form-control">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input type="text" name='name' placeholder="Your Name" className="border border-gray-300 rounded-lg bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" required/>
                                
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                                    <input type="email" name="email" placeholder="Your Email" className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                                
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Photo URL</label>
                                <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                                    <input type="text" name="photo" placeholder="Your photo" className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                                    
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                                    <input type="password" name="password" placeholder="••••••••" className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""/>
                                    
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                                    <input type="password" name="confirmPassword" placeholder="••••••••" className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""/>
                                    
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start" onClick={handleAccepted}>
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-light text-gray-500">I accept the <Link className="font-medium text-primary-600 hover:underline" to="./terms" >Terms and Conditions</Link></label>
                                    </div>
                                </div>
                            </div>
                            <button disabled={!accepted} type="submit" className="w-full text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an Account</button>
                            
                            <p className="text-sm font-light text-gray-500">Already have an account? 
                                <Link className="font-medium text-primary-600 hover:underline ml-2" to="/login">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;