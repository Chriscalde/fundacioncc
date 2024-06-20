import React from "react";
import Image from "next/image";
import Link from "next/link";
import {HomeIcon,ChatBubbleLeftEllipsisIcon,CogIcon,ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/solid"
import logoCC from "../assets/img/logoNFA.png"
import { useRouter } from "next/navigation";
export default function DashboardHeader(){
    const router = useRouter();
    const logOut=async()=>{
        localStorage.removeItem('user') || localStorage.removeItem('token');
        router.push('dashboard/login');
    }

    return (
        <div id="header-dashboard" className="flex flex-row justify-between px-16 py-4 bg-primary">
            <div id="header-dashboard-logo">
                <Image src={logoCC} width={80} height={60} alt="Logo Dashboard"/>
            </div>
            <div id="header-dashboard-icons" className="flex flex-row items-center gap-4">
                <Link href="/dashboard">
                    <HomeIcon className="size-8 text-secondary ease-in duration-300 hover:scale-125"/>
                </Link>
                <ChatBubbleLeftEllipsisIcon className="size-8 text-secondary ease-in duration-300 hover:scale-125"/>
                <CogIcon className="size-8 text-secondary ease-in duration-300 hover:scale-125"/>
                <button onClick={logOut}>
                    <ArrowRightStartOnRectangleIcon className="size-8 text-secondary ease-in duration-300 hover:scale-125"/>
                </button>
            </div>
        </div>
    )
}