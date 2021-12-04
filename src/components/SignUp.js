import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function SignUp() {
    const [credentails, setCredentails] = useState({name:"",email:"",password:""})
    const history = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentails.name,email:credentails.email,password:credentails.password})
        });
        const jsonValue = await response.json();
        console.log(jsonValue);
        if(jsonValue.success){
            localStorage.setItem('token',jsonValue.authToken);
            localStorage.setItem('userName', jsonValue.user.name);
            localStorage.setItem('userId', jsonValue.user._id);
            history('/');
        }else{
            alert("Invalid Details");
        }
    }
    const onChange = (e) =>{
        setCredentails({...credentails, [e.target.name]:e.target.value});
    }
    return (
        <div className="row">
            <div className="col-md-4 bg-light p-3">
                <h1 className="text-dark">SignUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-dark">Name</label>
                        <input type="text" className="form-control" id="name" minLength={2} onChange={onChange} value={credentails.name} name="name" aria-describedby="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-dark">Email address</label>
                        <input type="email" className="form-control" id="email" onChange={onChange} value={credentails.email} name="email" aria-describedby="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-dark">Password</label>
                        <input type="password" name="password" className="form-control" minLength={5} onChange={onChange} value={credentails.password} id="password" required/>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
            </div>
        </div>
    )
}
