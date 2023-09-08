import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactFacebookLogin from "react-facebook-login";

const Integrate = () => {
    const [pageData, setPageData] = useState({
        page_id: "",
        page_name: "",
        page_access_token: "",
        page_category: "",
    });

    const navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/my-profile");
    };

    const handlefacebookLogin = async (response) => {
        const { accessToken, userID } = response;
        console.log(accessToken, userID);
        await axios
            .get(
                `https://graph.facebook.com/v17.0/${userID}/accounts?access_token=${accessToken}`
            )
            .then((res) => {
                const page_id = res.data.data[0].id;
                const page_name = res.data.data[0].name;
                const page_access_token = res.data.data[0].access_token;
                const page_category = res.data.data[0].category;
                setPageData({
                    page_id: page_id,
                    page_name: page_name,
                    page_access_token: page_access_token,
                    page_category: page_category,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        setLocalStorage("pagedata", JSON.stringify(pageData));
    };

    const setLocalStorage = (key, val) => {
        localStorage.setItem(key, val);
    };

    const handleIntegrate = () => {
        localStorage.removeItem("pagedata");
        window.location.reload();
    };

    return (
        <div className="w-screen h-screen border-2 border-black overflow-hidden flex flex-col justify-center items-center bg-[#1e4d91]">
            <div className="flex min-w-[300px]  bg-white text black flex-col   rounded-md">
                {localStorage.getItem("pagedata") ? (
                    <div className="page-data">
                        <div className="page-name">
                            <p>
                                <strong>
                                    {JSON.parse(localStorage.getItem("pagedata")).page_name}
                                </strong>
                            </p>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {localStorage.getItem("pagedata") ? (
                    <div className="w-screen h-screen flex justify-center items-center bg-[#1e4d91]">
                        <div className="flex min-w-[300px] bg-white text black flex-col  gap-8 p-2  rounded-md">
                            <button
                                className=" bg-red-500 px-4 text-white py-4 rounded-md w-[80%] mx-auto"
                                onClick={handleIntegrate}
                            >
                                Delete Integration
                            </button>
                            <button className=" bg-[#5d91df] px-4 py-4 text-white rounded-md w-[80%] mx-auto" onClick={gotoDashboard}>Reply to Messages</button>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div className="w-screen h-screen flex justify-center items-center bg-[#1e4d91]">
                            <div className="flex min-w-[300px] bg-white text black flex-col  gap-8 p-8 rounded-md">
                                <div className=" bg-[#548cdc] px-4 text-white py-4 rounded-md w-[80%] mx-auto">
                                <ReactFacebookLogin
                                    appId="2073474669653714"
                                    cssClass="integrate-btn"
                                    textButton="Connect Page"
                                    
                                    fields="name,email,picture"
                                    scope="pages_manage_metadata,pages_manage_engagement,pages_messaging,pages_read_engagement,pages_read_user_content,pages_show_list,pages_manage_cta"
                                    callback={handlefacebookLogin}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Integrate;