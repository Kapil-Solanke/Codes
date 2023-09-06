import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {LoginSocialFacebook}from 'reactjs-social-login';
import { useLocation, useNavigate } from "react-router";
import { AppContext } from '../context/AppContext';
const responseFacebook = (response) => {
    console.log(response);
}
const componentClicked = (data) => {
    console.log(data);
}
export const FBLogin = () => {
    const { user, setUser, token, setToken } = useContext(AppContext);
    const navigate=useNavigate();
    useEffect(() => {
        if(user){
            navigate('my-profile');
        }
    }, [])
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-[#1e4d91]'>
            <div className='flex min-w-[300px] bg-white text black flex-col  gap-8 p-8 rounded-md'>
                <LoginSocialFacebook
                    appId="639988531622273"
                    onResolve={(res)=>console.log(res)}
                    onReject={(rej)=>console.log(rej)}
                    >
                    <button>
                    Login</button>
                </LoginSocialFacebook>                   
            </div>
        </div>
    )
}
