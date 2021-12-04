import React, { useEffect, useState } from 'react'

export default function Profile() {
    const [jsonValue, setJsonValue] = useState({name:"",email:"",date:""});
    const getProfile = async ()=>{
        const response = await fetch('http://localhost:5000/api/auth/get-user-details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setJsonValue(json);
    }
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <div className="container-fluid">
            <table className="table table-striped">
                <thead>
                    <tr colSpan="2">
                        <td className="text-uppercase"><h2>Profile</h2></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{jsonValue.name}</td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>{jsonValue.email}</td>
                    </tr>
                    <tr>
                        <td>Create Account On</td>
                        <td>{new Date(jsonValue.date).toGMTString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
