import React, { useState, useEffect } from "react";
import { BiAlignLeft } from "react-icons/bi"
import { GrPowerReset } from "react-icons/gr"
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

