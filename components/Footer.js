import React from "react";
import Image from "next/image";

import rLogo from "../assets/svg/raptorslogo.svg"

export default function Footer(){
    return(
        <div className="w-full p-2 bg-secondary  border-t-2 border-primary">
            <a href="https://raptordevs.com" target="_blank" rel="noopener noreferrer" className="text-primary mx-auto flex flex-grow justify-center items-center text-xs md:text-base">
                <span className="md:mr-2">&copy; Fundación Carlos Cuevas 2024 | </span>
                    Powered by {' '}
                <span className=" ">
                    <Image src={rLogo} alt="logo" width={80} height='auto'></Image>
                </span>
        </a>
        </div>
    )
}