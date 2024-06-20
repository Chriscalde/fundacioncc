'use client'
import React from "react";
import axios from "@/lib/axiosConfig"
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import style from "@/styles/Home.module.css"
import logoCC from "@/assets/img/logoNFA.png"

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login(){

    const [formData,setFormData] = useState({
        username: "",
        password: ""
    });
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const loginUser = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('login',formData)
            // console.log(response.data);
            const dataString = JSON.stringify(response.data.data);
            const token = response.data.token;
            localStorage.setItem("user",dataString);
            localStorage.setItem("token",token);
            router.push('/dashboard');
        } catch(e) {
            alert('Error:'+e)
        }
    }

    return (
        <div>
            <Header/>
            <main className="w-full p-0 h-auto flex">
                <div className={style.maindiv}>
                    <section id="login-section" className="md:mx-24 md:my-28 m-4 pt-8 rounded-xl bg-grayText/75">
                        <div className="flex md:flex-row flex-col m-10">
                            <div id="left_login" className="flex flex-col gap-4">
                                <form className="gap-4 flex flex-col" onSubmit={loginUser}>
                                    <h1 className="text-secondary text-5xl font-bold">Iniciar Sesión</h1>
                                    <h2 className="text-terciary md:text-3xl text-lg font-semibold md:text-wrap md:w-[80vh]">Bienvenido. Por favor ingresa tus credenciales
                                    para acceder al portal.</h2>
                                    <label htmlFor="username" className="flex flex-col mt-8">
                                        <span className="text-terciary text-3xl font-semibold">Usuario</span>
                                        <input type="text" placeholder="Usuario" id="username" name="username" required value={formData.username} onChange={handleChange} className="p-5 mt-2 rounded-md md:w-[80vh] text-xl bg-primary placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                                    </label>
                                    <label htmlFor="password" className="flex flex-col mt-4">
                                        <span className="text-terciary text-3xl font-semibold">Contraseña</span>
                                        <input type="password" placeholder="Contraseña" id="password" name="password" required value={formData.password} onChange={handleChange} className="p-5 mt-2 rounded-md md:w-[80vh] text-xl bg-primary placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                                    </label>
                                    <button type="submit" className="rounded-full bg-secondary text-xl font-bold p-4 mx-auto text-primary ring-white outline-white">Iniciar Sesión</button>
                                </form>
                            </div>
                            <div id="right_login" className="flex flex-col px-20 pt-20">
                                <Image src={logoCC} sizes="cover" alt="logoCC"/>
                            </div>
                        </div>
                        <form></form>
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    )
}