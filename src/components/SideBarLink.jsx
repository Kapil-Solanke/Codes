import * as Icons from "react-icons/lia"
import { NavLink, matchPath, useLocation } from "react-router-dom"


export default function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName]
    const location = useLocation()

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink
            to={link.path}
            className={`relative w-full h-[90px] flex justify-center items-center ${matchRoute(link.path)
                    ? "bg-white text-[#1e4d91] text-3xl"
                    : "bg-[#1e4d91] text-white text-3xl"
                } transition-all duration-200`}
        >
            <Icon className="text-3xl  max-sm:hidden" />
        </NavLink>
    )
}