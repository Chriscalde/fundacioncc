import React from "react";
import Image from "next/image";

import logoCC from "../assets/img/logocc.png"
import fbIcon from "../assets/svg/facebook1.svg"
import waIcon from "../assets/svg/whatsapp1.svg"
export default function ContactFooter(){
    return(
        <div className="w-full md:grid md:grid-cols-5 flex flex-col gap-5 bg-secondary p-10">
            <div className="col-span-3 flex flex-col text-left my-auto text-primary">
                <h1 className="text-4xl font-bold">Contacto</h1>
                <h2 className="text-xl font-semibold mb-5">¿Tienes preguntas o comentarios? ¡Estamos aquí para ayudarte!</h2>
                <a className="text-lg text-center md:text-left" href="mailto:fundacioncarloscuevas@gmail.com">Correo Electrónico: fundacioncarloscuevas@gmail.com </a>
                <a className="text-lg text-center md:text-left" href="tel:+526394650034">Teléfono: 639 465 00 34</a>
                <a className="text-lg text-center md:text-left" href="https://wa.me/526394650034?text=Quisiera%20mas%20informaci&oacute;n%20">WhatsApp: 639 465 00 34 </a>
            </div>
            <div className="col-span-2 flex flex-col justify-center">
                <Image src={logoCC} width={250} className="mx-auto"/>
                <div className="flex flex-row justify-center gap-5 px-10">
                <a href="https://www.facebook.com/profile.php?id=100044643034540" target="_blank" rel="noopener noreferrer"><Image src={fbIcon} width={80}/></a>
                <a href="https://wa.me/526394650034?text=Quisiera%20mas%20informaci&oacute;n%20" target="_blank" rel="noopener noreferrer"><Image src={waIcon} width={80}/></a>
                </div>
            </div>
        </div>
    )
}