'use client'
import React, {useEffect} from "react";
import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import Footer from "@/components/Footer";

import style from "@/styles/Home.module.css"
import Image from "next/image";
import Link from "next/link";

import iconFb from "@/assets/svg/facebook.svg"
// import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Confirmacion(){
    // useEffect(()=>{
    //     const router = useRouter();
    //     router.push('../');
    // },[])
    return (
        <div>
            <Header/>
            <main className={style.maindiv}>
                <section id="main-confirmation" className="flex flex-col justify-center text-center p-8 my-auto gap-4">
                    <h1 className="text-6xl font-bold text-secondary">¡Gracias Por Participar!</h1>
                    <h2 className="text-4xl font-semibold text-primary">Tu participación ha sido registrada con éxito.</h2>
                    <p className="text-2xl italic font-medium text-primary">El sorteo se realizará el <strong>6 de Agosto</strong></p>
                    <p className="text-2xl font-medium text-secondary">Para más información y actualizaciones, síguenos en nuestras redes sociales.</p>
                    <a href="https://www.facebook.com/profile.php?id=100044643034540" target="_blank" rel="noopener noreferrer" className="mx-auto"><Image src={iconFb} width={60} height={60} alt="Facebook Icon"/></a>
                </section>
            </main>
            <ContactFooter/>
            <Footer/>
        </div>
    )
}