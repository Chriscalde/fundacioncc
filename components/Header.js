'use client'
import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import logoCC from "../assets/img/logoNFA.png"
import iconFb from "@/assets/svg/facebook.svg"
import iconWa from "../assets/svg/whatsapp.svg"
import { useState } from "react"
const Header=()=>{
    const [shouldHideDiv, setShouldHideDiv] = useState(false);
    useEffect(() => {
      const hiddenPaths = ['/dashboard/login'];
      setShouldHideDiv(hiddenPaths.includes(window.location.pathname));
    }, []);
    return (
        <div id="header" className="flex md:flex-row flex-col p-5 bg-primary w-full">
            <div id="headerlogo" className="md:mr-auto mx-auto md:ml-0">
                <Image src={logoCC} width={128} height='auto' alt="Logo FCC"/>
            </div>
            {!shouldHideDiv && (
            <div id="headersections" className="flex flex-wrap p-4">
                <ul className="m-auto p-0 list-none flex font-semibold">
                    <li className="relative whitespace-nowrap px-1"><Link href={"/landingpage/#"} className="duration-300 text-secondary hover:text-terciary">Inicio</Link></li>
                    <li className="relative whitespace-nowrap px-1"><Link href={"/rifas"} className="duration-300 text-secondary hover:text-terciary">Rifas</Link></li>
                    <li className="relative whitespace-nowrap px-1"><Link href={"/landingpage/#nosotros"} className="duration-300 text-secondary hover:text-terciary">Nosotros</Link></li>
                    <li className="relative whitespace-nowrap px-1"><Link href={"#contact"} className="duration-300 text-secondary hover:text-terciary">Contacto</Link></li>
                </ul>
            </div>
            )}
            <div id="headersocials" className="flex md:flex-wrap flex-row md:mr-0 md:ml-auto mx-auto gap-7 my-auto">
                <a href="https://www.facebook.com/profile.php?id=100044643034540" className="hover:fill-terciary" target="_blank" rel="noopener noreferrer"><Image src={iconFb} width={40} height='auto' alt="Facebook Icon"/></a>
                <a href="https://wa.me/526394650034?text=Quisiera%20mas%20informaci&oacute;n%20" target="_blank" rel="noopener noreferrer"><Image src={iconWa} width={40} height='auto' alt="WhatsApp Icon"/></a>
            </div>
        </div>
    )
};
export default Header;