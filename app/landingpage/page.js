import React from "react";

import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import Footer from "@/components/Footer";

import styles from "@/styles/Home.module.css"
import Link from "next/link";

export default function LandingPage(){
    return (
        <div>
            <Header/>
            <section id="hero" className={styles.maindiv}>
                <div className="justify-center text-center flex flex-col my-auto">
                    <h1 className="text-6xl text-grayText font-bold">RIFAS PARA UNA BUENA CAUSA</h1>
                    <h2 className="text-xl mt-3 font-semibold text-primary">¡Participa en Nuestras Rifas y Ayúdanos a Cambiar Vidas!</h2>
                    <Link className="bg-secondary rounded-xl text-primary mx-auto mt-12 p-4 text-2xl font-bold" href="">PARTICIPAR</Link>
                    <Link className="rounded-full border-4 border-grayText text-grayText mx-auto mt-4 px-6 py-2 text-xl font-bold" href="">Mas Información</Link>
                </div>
            </section>
            <ContactFooter/>
            <Footer/>
        </div>
    )
}