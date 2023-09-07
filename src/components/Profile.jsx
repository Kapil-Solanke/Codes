import React from "react";
import styled from "styled-components";
import {FaPhone} from 'react-icons/fa6'
import {RiAccountCircleFill} from 'react-icons/ri'  
export const Profile = ({user}) => {

    return (
        <div className="w-full h-full bg-[#f3f0f0] flex flex-col items-center mt-3 ">
            <div className="w-full p-2 flex flex-col bg-[#ffffff] items-center gap-2">
                <div className="w-[3rem]">
                <img
                    src={`data:image/svg+xml;base64,${user?.avatarImage}`}
                    alt=""
                    className="mt-2"
                    />
                </div>
                <div className=" font-bold text-xl text-center mt-3">
                    {user?.username}
                </div>
                <div className="text-center text-[#b1b1b1]">&#8226; offline</div>
                <div className=" flex gap-2 text-xs  ">
                    <button className="flex gap-3 p-1  items-center justify-center border-2 rounded-md border-[#bbc0c4]">
                        <FaPhone className='text-xl' /> CALL
                    </button>
                    <button className="flex gap-3 p-1 items-center justify-center border-2 rounded-md border-[#bbc0c4]">
                        <RiAccountCircleFill className='text-xl' /> PROFILE
                    </button>
                </div>
            </div>
            <div className="mx-3 my-3 w-[90%] flex p-2 flex-col border-2 bg-[#fff]">
                <h6 className=" font-bold">Customer details</h6>
                <div className="flex justify-between">
                    <div className="heading text-[#b1b1b1]">Email</div>{" "}
                    <div className="value">{user?.email}</div>
                </div>
                <div className="flex justify-between">
                    <div className="heading text-[#b1b1b1]">Name</div>{" "}
                    <div className="value">{user?.username}</div>
                </div>
                {/* <div className="row">
                    <div className="heading">First Name</div>{" "}
                    <div className="value">{user?.username.split(" ")[0]}</div>
                </div>
                <div className="row">
                    <div className="heading">Last Name</div>{" "}
                    <div className="value">{user?.username.split(" ")[0]}</div>
                </div> */}
                <div className="row">
                    {/* eslint-disable-next-line */}
                    <a href='#' className="text-[#3f50b5]">
                        View more details
                    </a>
                </div>
            </div>
        </div>
    );
};

const Container=styled.div`

  .details {
    margin: 20px 10px;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #bbc0c4;
    background: #fff;
    display: flex;
    flex-direction: column;
    font-size: 13px;
  
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 5px;
  
      .heading {
        color: rgb(177, 177, 177);
      }
  
      .link {
        color: #3f50b5;
        text-decoration: none;
      }
    }
  }
  
`;