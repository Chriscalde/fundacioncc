import React from "react";

import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "@/styles/Home.module.css"
import Link from "next/link";
import Image from "next/image";

import {FaceSmileIcon, GiftTopIcon, UserGroupIcon} from "@heroicons/react/24/solid"
import pic1 from "/assets/img/pic1.jpg"
import pic2 from "/assets/img/pic2.jpg"
import pic3 from "/assets/img/pic3.jpg"

const rifaInfo =({
  date: "Martes 6 de Agosto del 2024",
})
export default function LandingPage(){
    return (
        <div>
            <Head>
              <title>Fundación Carlos Cuevas</title>
              <meta name="description"/>
              <meta property="og:title" content="Página de Inicio"/>
              <meta property="og:url" content="https://www.fundacioncarloscuevas.com"/>
              <meta property="og:type" content="website"/>
              <meta property="og:site_name" content="Fundación Carlos Cuevas"/>
            </Head>
            <Header/>
            <section id="hero" className={styles.maindiv}>
                <div className="justify-center text-center flex flex-col my-auto">
                    <h1 className="text-6xl text-grayText font-extrabold">RIFAS PARA UNA BUENA CAUSA</h1>
                    <h2 className="text-xl mt-3 font-semibold text-primary">¡Participa en Nuestras Rifas y Ayúdanos a Cambiar Vidas!</h2>
                    {/* <Link className="bg-secondary hover:bg-terciary duration-300 rounded-xl text-primary mx-auto mt-12 p-4 text-2xl font-bold" href="/rifas">PARTICIPAR</Link> */}
                    <Link className="rounded-full border-4 border-grayText hover:bg-grayText hover:text-terciary duration-300 text-grayText mx-auto mt-4 px-6 py-2 text-xl font-bold" href="#rifa">Mas Información</Link>
                </div>
            </section>
            <section id="participar" className="bg-blueGray p-8">
                <h1 className="text-center font-extrabold text-3xl text-grayText">¿Por qué Participar?</h1>
                <div className="md:grid md:grid-cols-3 flex flex-col gap-16 mt-10 mx-8">
                    <div className="flex flex-col text-center items-center text-grayText">
                        <h3 className="font-bold text-2xl">Apoya a una Causa Noble</h3>
                        <FaceSmileIcon className="size-28 mt-6"/>
                        <p className="font-semibold text-base text-primary">Cada boleto que compras contribuye directamente al apoyo de gente de escasos recursos</p>
                    </div>
                    <div className="flex flex-col text-center items-center text-grayText">
                        <h3 className="font-bold text-2xl">Gana Fantásticos Premios</h3>
                        <GiftTopIcon className="size-28 mt-6"/>
                        <p className="font-semibold text-base text-primary">¡Además de ayudar, podrías ganar premios increíbles!</p>
                    </div>
                    <div className="flex flex-col text-center items-center text-grayText">
                        <h3 className="font-bold text-2xl">¡Cambia Vidas!</h3>
                        <UserGroupIcon className="size-28 mt-6"/>
                        <p className="font-semibold text-base text-primary">Tu participación marca la diferencia en la vida de quienes más lo necesitan.</p>
                    </div>
                </div>
            </section>
            <section id="rifa" className="bg-grayText p-8">
                <div className="md:text-left text-center">
                    <h1 className="font-bold md:text-6xl text-4xl text-terciary">Próxima Rifa: {rifaInfo.date}*</h1>
                    <h3 className="font-semibold text-xl text-secondary">¡No te pierdas la oportunidad de hacer el bien y ganar premios emocionantes!</h3>
                    <p className="text-lg font-semibold text-secondary">Para poder elegir tus boletos deberas tener a la mano tu comprobante de pago, en caso de no tenerlo<br/> puedes hacer una transferencia o un depósito a la siguente cuenta.</p>
                                        <p className="text-lg font-semibold text-secondary">Nombre del Titular: <span>Carlos Cuevas Acosta</span></p>
                                        <p className="text-lg font-semibold text-secondary">CLABE Interbancaria: <span>072150012785162537</span></p>
                                        <p className="text-lg font-semibold text-secondary">BANORTE</p>
                </div>
                <div className="md:text-right text-center md:mt-5 text-terciary">
                    <h2 className="text-4xl font-semibold">Primer Lugar: iPhone 15 Pro</h2>
                    <h2 className="text-3xl font-light">Segundo Premio: $1000 Pesos</h2>
                    <h2 className="text-3xl font-light">Tercer Premio: $500 Pesos</h2>
                </div>
                <div className="p-8 text-center md:text-right">
                    {/* <Link href="/rifas" className="mt-10 rounded-full py-2 px-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary duration-300 font-bold text-2xl">Boletos</Link> */}
                </div>
            </section>
            <section id="nosotros" className="bg-terciary p-8 text-primary">
                <div className="md:text-right text-center ltr:w-1/2">
                    <h1 className="text-5xl font-bold text-grayText">Nosotros</h1>
                    <h2 className="text-3xl font-semibold mt-6">Acerca de Nuestra Causa</h2>
                    <p className="text-lg font-semibold md:w-1/2 md:ml-auto">Nos enorgullece poder ayudar a familias y personas en situaciones de pobreza extrema, proporcionando recursos esenciales como alimentos, ropa, y acceso a servicios médicos. Además, nuestras iniciativas incluyen programas educativos y de capacitación laboral para empoderar a individuos y permitirles construir un futuro mejor y más autosuficiente.</p>
                </div>
                <div className="md:text-left text-center mt-10 md:w-1/2">
                    <h2 className="text-3xl font-semibold">¿A Quién Ayudamos?</h2>
                    <p className="text-lg font-semibold">Estamos dedicados a hacer la diferencia en la vida de las personas con escasos recursos a través de nuestras emocionantes rifas. Nuestra misión es crear oportunidades y brindar apoyo a aquellos que más lo necesitan, transformando sueños en realidades tangibles.</p>
                </div>
                <h2 className="text-center text-3xl text-grayText font-semibold my-4">Rifas Anteriores y Donaciones</h2>
                <div className="md:grid md:grid-cols-3 flex flex-col gap-10">
                    <Image src={pic1} className="rounded-xl" style={{width: "450px", height: "350px" ,objectFit: "cover"}}/>
                    <Image src={pic2} className="rounded-xl" style={{width: "450px", height: "350px" ,objectFit: "cover"}}/>
                    <Image src={pic3} className="rounded-xl" style={{width: "450px", height: "350px" ,objectFit: "cover"}}/>
                </div>
            </section>
            <ContactFooter id="#contact"/>
            <Footer/>
        </div>
    )
}