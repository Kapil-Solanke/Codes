import React, { useState, useEffect } from "react";
import { BiAlignLeft } from "react-icons/bi"
import { GrPowerReset } from "react-icons/gr"
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Conversations({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data?.username);
      setCurrentUserImage(data?.avatarImage);
    };
    fetchDetails();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className="text-black border-r-2 h-full  ">
      {currentUserImage && currentUserImage && (
        <div>
          <div className="h-[10%] flex items-center border-b-2 justify-around px-2 py-4 text-xl bg-[#ffffff] ">
            <div className="text-[#595757]"><BiAlignLeft /></div>
            <h3 className="text-black font-bold">Conversations</h3>
            <div><GrPowerReset /></div>
          </div>
          <div className=" h-[90%]  flex flex-col  items-center gap-3 bg-[#ffffff39] ">
            {contacts?.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={` w-full min-h-[4rem] cursor-pointer  border-b-2 rounded-sm flex items-center gap-4 ${index === currentSelected ? "bg-[#edeef0]" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}>
                  <div className="">

                  </div>
                  <div className=" text-black">
                    <h3>{contact?.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;