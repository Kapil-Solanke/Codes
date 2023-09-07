import { useEffect, useState } from "react";
import { sidebarLinks } from "../data/dashboard-links";
import SidebarLink from "./SideBarLink";
import Logout from './Logout'
export default function Sidebar() {
    const user=JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const [authLoading, setauthLoading] = useState(true);
    const [profileLoading, setprofileLoading] = useState(true);

    const [active,setActive]=useState(false);
    useEffect(() => {
        if (user) {
            setprofileLoading(false);
            setauthLoading(false);
            console.log(user);
        }
        // console.log(user);
    }, [])


    return (
        <div className="h-full bg-[#1e4d91]">
            <div className="block z-20 absolute md:relative">
                <div className="flex h-screen min-w-[100px] flex-col justify-between  border-r-[1px]  text bg-center text-richblack-25">
                    <div className="flex flex-col">
                        {sidebarLinks.map((link) => {
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            );
                        })}
                    </div>
                    <div className="flex flex-col w-[50px] mb-10 mx-auto bottom-0  text-black">
                        <div className="relative ">
                        <img
                            src={`data:image/svg+xml;base64,${user?.avatarImage}`}
                            alt=""
                            onClick={()=>setActive(!active)}
                        />
                        <div className="w-[15px] h-[15px] rounded-full bg-green-600 absolute bottom-0 right-0"></div>
                        </div>
                        {active&&<div className="absolute bottom-0"><Logout/></div>}
                    </div>
                </div>
            </div>

        </div>
    );
}
