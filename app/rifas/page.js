'use client'
import React, { useEffect } from "react";
import axios from "@/lib/axiosConfig";
import axiosImg from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";
import InfoRifa from "@/components/InfoRifa";

import Image from "next/image";
import Link from "next/link";

import p1 from "/assets/img/ip15.jpeg"
import p2 from "/assets/img/1000.jpeg"
import p3 from "/assets/img/500p.jpeg"

import {ArrowRightIcon, CameraIcon, ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassCircleIcon} from "@heroicons/react/24/solid"

import { useState } from "react";
import tailwindConfig from "@/tailwind.config";
import Head from "next/head";
import { useRouter } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
export default function Rifas(){

    const [activeStep,setStep] = useState(1);
    const [availableNums,setAvailableNums] = useState([]);
    const [tickets,setTickets] = useState([]);
    const [selectedFile,setSelectedFile] = useState(null);
    const [uploadStatus,setUploadStatus] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [isMounted,setIsMounted] = useState(false)
    const limit = 50;
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTicketValue,setSearchTicketValue] = useState('')
    const [rifaStatus,setRifaStatus] = useState('')

    useEffect(() => {
        fetchData();
        setIsMounted(true);
        setRifaStatus('now')
    },[]);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    

    const handleUpload = async()=>{
        if(!selectedFile){
            setUploadStatus('No file selected');
            return;
        }
        // const formData = new FormData();
        // formData.append('image',selectedFile);
        const nameTxt = formData.name.substring(0,3).toLocaleLowerCase() , lNameTxt = formData.lastName.substring(0,3).toLocaleLowerCase()
        const extension = selectedFile.type.split('/')[1];
        const imageTitle = nameTxt+lNameTxt+formData.phone+'.'+extension;
        // console.log(imageTitle)
        try{
            const response = await axiosImg.put(`https://hnouee5av8.execute-api.us-east-1.amazonaws.com/test2/fundacion-images-bucket/${imageTitle}`,selectedFile,{
                headers:{
                    'Content-Type': 'image/jpeg',
                    'Accept':'*/*'
                }
            });

            if(response.status === 200){
                const imageUrl = `https://fundacion-images-bucket.s3.amazonaws.com/${imageTitle}`
                try {
                const resOrder = await axios.get('customer/getLastOrder')
                const lastOrder = resOrder.data.data ? resOrder.data.data.orderNumber : 0
                // console.log(lastOrder)
                setFormData((prevData)=>({
                    ...prevData,
                    imgURL: imageUrl,
                    verified: true,
                    orderNo: lastOrder+1
                }));
                setStep(activeStep+1);
                } catch(error) {
                    console.error('Error fetching last order',error )
                    setFormData((prevData)=>({
                        ...prevData,
                        imgURL: imageUrl,
                        verified: true,
                        orderNo: 1
                    }));
                }
                
                
            }
            //   setUploadStatus('File uploaded successfully: ' + response.data.fileUrl)
              
            
        } catch (error) {
            setUploadStatus('File upload failed: ' + error.message)
        }
    }
    const getFullName = () => {
        return `${formData.name} ${formData.lastName}`
    }
    const createCustomer = async()=>{
        const customerData = {
            name: getFullName(),
            phone: formData.phone,
            imgURL: formData.imgURL,
            tickets: formData.tickets.map(ticket => ticket),
            verified: formData.verified,
            orderNo: formData.orderNo
        }
        try {
            const response = await axios.post('customer/createCustomer',customerData)
            // console.log(response);
            updateTickets();
            if(response && isMounted){
                router.push('rifas/confirmacion')
            }
        }catch(e){
            // alert(e);
            if(e.code=11000){
                alert('Este número de télefono ya esta registrado')
            }
        }
    }
    const updateTickets = async()=>{
        const ticketIds = tickets.map(ticket=>ticket.id)
        const ticketsData = {
            tickets: ticketIds,
            'status': 'sold'
        }
        try {
            const response = await axios.put('ticket/updateStatus',ticketsData)
            // console.log(response)
        } catch(e){
            alert(e)
        }
    }

    const handleClickConfirm = () =>{
        createCustomer();
    }

    const fetchData = async()=>{
        try{
            const response = await axios.get('ticket/getAll')
            const data = await response.data.data
            // console.log(data);
            const filtered = data.map(item=>({
                id: item._id,
                number: item.number,
                status: item.status
        }));
            setAvailableNums(filtered);
        }catch(error){
            // console.log(error)
            alert(error);
        }
    };

    const handleTicket = (item) =>{
        // if(tickets.includes(item)){
        //     setTickets(tickets.filter((n)=> n !== item));
        // }else{
        //     setTickets(prevTickets=>[...prevTickets,item]);
        // }
        // setFormData({...formData,tickets:tickets});
        let updatedSelectedNumbers;
        if (tickets.includes(item)) {
            updatedSelectedNumbers = tickets.filter((n) => n !== item);
        } else {
            updatedSelectedNumbers = [...tickets, item];
        }
        setTickets(updatedSelectedNumbers);
        setFormData({ ...formData, tickets: updatedSelectedNumbers.map((num)=>num.id) })
    };

    const handleTicketSearch = (event) => {
        const value = event.target.value;
        if(/^\d{0,4}$/.test(value)){
            setSearchTicketValue(value);
        }
    }

    const searchForTicket = () => {
        if(searchTicketValue.length === 4){
            const ticketFound = availableNums.find((item)=>(item.number)===searchTicketValue)
            const repeated = tickets.find((item)=>(item.number)===searchTicketValue)
            if(ticketFound.status==='available' && !repeated){
                setTickets(prevTickets=>[...prevTickets,ticketFound]);
            }
        }
    }

    const getRandomAvailableTicket = () =>{
        const availableTickets = availableNums.filter(item=>item.status === 'available');
        if (availableTickets.length > 0){
            const randomIndex = Math.floor(Math.random()*availableTickets.length);
            const randomTicket = availableTickets[randomIndex]
            setTickets(prevTickets=>[...prevTickets,randomTicket]);
            setFormData(prevTickets=>({...prevTickets,tickets:[...prevTickets.tickets,randomTicket.id]}))
        }
    }

    const [formData, setFormData] =useState({
        name: "",
        lastName: "",
        phone: "",
        tickets: [],
        imgURL: "",
        verified: null,
        orderNo : 1
    })
    const showDiv =async(e)=>{
        e.preventDefault();
        setStep(activeStep+1);
      };

      const getBackgroundColor = (status) => {
        switch (status) {
          case 'available':
            return '#1985A1'; // Color verde
          case 'sold':
            return '#454851';
             // Color rojo 454851 893737
          default:
            return '#46494C'; // Color blanco
        }
      };
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const totalPages = Math.ceil(availableNums.length / limit);
    //Calculation of indexs to show on the grid 
    const indexOfLastTicket = currentPage * limit;
    const indexOfFirstTicket = indexOfLastTicket - limit;
    const currentTickets = availableNums.slice(indexOfFirstTicket,indexOfLastTicket);
    const handleNextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage+1);
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1);
        }
    }
    return(
        
        <div>
            <Head>
              <title>Compra de Boletos</title>
              <meta name="description"/>
              <meta property="og:title" content="Página de Rifas"/>
              <meta property="og:url" content="https://www.fundacioncarloscuevas.com/rifas"/>
              <meta property="og:type" content="website"/>
              <meta property="og:site_name" content="Fundación Carlos Cuevas"/>
            </Head>
            <Header/>
            <main className="w-full p-0">
                
                {rifaStatus==='soon' && (
                    <div className="h-[80vh] w-auto flex flex-col align-middle items-center">
                        <div className="mx-auto my-auto text-center p-2">
                            <h1 className="md:text-8xl text-5xl font-extrabold text-secondary">Próximamente</h1>
                            <h1 className="md:text-4xl text-2xl font-semibold text-terciary">Por el momento no hay rifas activas</h1>
                        </div>
                    </div>
                )}
                {rifaStatus==='now' && (
                    <div>
                        <section className="flex flex-col text-center bg-primary p-4" id="hero-rifas">
                    <h1 className="text-6xl text-terciary font-bold">RIFA iPhone 15 Pro</h1>
                    <h2 className="text-4xl text-secondary font-semibold">Martes 6 de Agosto del 2024</h2>
                    <h3 className="text-2xl text-secondary font-normal">Precio del Boleto: $50 Pesos</h3>
                    <div className="md:grid md:grid-cols-3 flex flex-col overflow-x-auto md:gap-24 gap-6 md:items-center md:justify-center mx-auto md:mt-4" >
                        <div id="premioMayor" className="md:flex md:flex-col text-center ">
                            <Image src={p1} className="rounded-2xl border-4 border-secondary shadow-xl" alt="p2" style={{width: "370px", height: "240px" ,objectFit: "cover"}}/>
                            <h2 className="font-bold text-secondary text-3xl mt-4">Primer Lugar</h2>
                            <p className="font-semibold text-secondary text-lg">iPhone 15 Pro </p>
                        </div>
                        <div id="premioSegundo" className="md:flex md:flex-col text-center md:-order-1">
                            <Image src={p2} className="rounded-2xl border-4 border-secondary shadow-xl" alt="p1" style={{width: "370px", height: "240px" ,objectFit: "cover"}}/>
                            <h2 className="font-bold text-secondary text-3xl mt-4">Segundo Premio</h2>
                            <p className="font-semibold text-secondary text-lg">$1000 Pesos</p>
                        </div>
                        <div id="premioTercero" className="md:flex md:flex-col text-center">
                            <Image src={p3} className="rounded-2xl border-4 border-secondary shadow-xl" alt="p3" style={{width: "370px", height: "240px" ,objectFit: "cover"}}/>
                            <h2 className="font-bold text-secondary text-3xl mt-4">Tercer Premio</h2>
                            <p className="font-semibold text-secondary text-lg">$500 Pesos</p>
                        </div>
                    </div>
                    <Link className="rounded-[20px] px-4 py-2 bg-secondary text-primary text-3xl mx-auto mt-4 font-bold hover:bg-blueGray duration-300" href="#form-rifa" scroll={true}>PARTICIPAR</Link>
                    <p className="my-2 font-semibold text-terciary">Antes de elegir tus boletos, debes tener a la mano tu transferencia o tu recibo de depósito, da click en <span className="font-bold underline">Mas Información</span> para saber mas información acerca del proceso.</p>
                    <button type="button" className="mt-4 border-4 border-terciary text-terciary font-semibold text-2xl mx-auto px-4 py-1 rounded-full hover:bg-terciary hover:text-primary duration-300" onClick={openModal}>Mas Información</button>
                </section>
                        <section className="pt-24 pb-24 bg-primary justify-center items-center scroll-smooth" id="form-rifa">
                        <div className="rounded-xl bg-terciary md:mx-auto mx-4 md:max-w-[750px] ">
                            {activeStep == 1 && (
                            <div className="flex flex-col justify-center align-middle items-center p-4 gap-2">
                               <h1 className="font-bold text-5xl text-grayText text-center">Comprar Boletos</h1>
                               <form className="flex flex-col" onSubmit={showDiv}>
                                <label htmlFor="name" className="flex flex-col items-center align-middle mt-4 md:mt-0">
                                    <span className="text-primary text-3xl font-semibold">Nombre</span>
                                    <input type="text" placeholder="Nombre" id="name" name="name" required value={formData.name} onChange={handleChange} className="py-1 px-4 ml-3 mt-2 rounded-full bg-grayText placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                                </label>
                                <label htmlFor="lastName" className="flex flex-col items-center align-middle mt-4 md:mt-0">
                                    <span className="text-primary text-3xl font-semibold">Apellido</span>
                                    <input type="text" placeholder="Apellido" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className="py-1 px-4 ml-3 mt-2 rounded-full bg-grayText placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                                </label>
                                <label htmlFor="phone" className="flex flex-col items-center align-middle mt-4 md:mt-0">
                                    <span className="text-primary text-3xl font-semibold">Número Telefónico</span>
                                    <input type="text" inputmode="numeric" placeholder="Teléfono (10 Dígitos)" maxlength="10" pattern="[0-9]*" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="py-1 px-4 ml-3 mt-2 rounded-full bg-grayText placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                                </label>
                                <button type="submit" className="items-center text-lg font-bold mx-auto bg-secondary rounded-full py-2 px-6 text-primary inline-flex align-middle justify-between mt-8">Continuar<ArrowRightIcon className="size-6 ml-4 inline-block"/></button>
                                </form>
                            </div>
                            )}
                            {activeStep == 2 && (
                            <div className="flex flex-col justify-center align-middle items-center p-4 md:gap-8 gap-2">
                               <h1 className="font-bold text-5xl text-grayText text-center">Seleccionar Boletos</h1>
                               <div className="overflow-x-auto my-4">
                                   <div className="grid md:grid-cols-10 grid-cols-5 gap-3 w-full">
                                        {currentTickets.map((order)=>(
                                            <button key={order.id} className={`p-2 text-terciary bg-primary rounded-md focus:outline-secondary focus:ring focus:ring-secondary min-w-[6ch] ${order.status === "available" ? "bg-primary" : 'bg-stone-600 text-primary'}`} style={{
                                                color: getBackgroundColor(order.status),
                                                cursor: order.status === 'available' ? 'pointer' : 'not-allowed'
                                            }} onClick={()=>handleTicket(order)} disabled={order.status !== 'available' }>
                                                {order.number}
                                            </button>
                                        ))}
                                   </div>
                               </div>
                               <div className="mx-auto flex flex-wrap mt-4 md:mt-0" id="page-control">
                                    <button onClick={handlePreviousPage} disabled={currentPage===1} className="text-secondary disabled:text-grayText"><ChevronLeftIcon className="size-6"/></button>
                                    <span className="text-primary font-semibold">Página {currentPage} de {totalPages}</span>
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-secondary disabled:text-grayText"><ChevronRightIcon className="size-6"/></button>
                               </div>
                               <div className="flex flex-col justify-center items-center">
                                    <div id="tickets-buttons" className="flex md:flex-row flex-col justify-between md:gap-8 gap-4">
                                        <div className="flex md:flex-row gap-2 mt-2">
                                            <input id="search-tickets" type="text" className="bg-primary rounded-full p-2 font-semibold outline-secondary" placeholder="Buscar Boleto" value={searchTicketValue} onChange={handleTicketSearch} onKeyDown={(e)=>{if(e.key === "Enter") searchForTicket();}}></input>
                                            <button className="my-auto" onClick={searchForTicket}><MagnifyingGlassCircleIcon className="size-8 text-secondary"/></button>
                                        </div>
                                        <button onClick={getRandomAvailableTicket} className="mt-2 bg-secondary text-primary font-semibold p-2 rounded-full">Generar Numero Aleatorio</button>
                                    </div>
                                    <h2 className="font-bold text-primary mt-5">Tickets Seleccionados</h2>
                                    {tickets.length > 0 ? (
                                        <ul className="grid md:grid-cols-10 grid-cols-5 gap-2 m-2">
                                        {tickets.map((ticket,index)=>(
                                            <div key={index} className="bg-secondary text-primary p-2 font-semibold rounded-md">{ticket.number}</div>
                                        ))}
                                        </ul>
                                    ):(
                                        <p className="font-bold text-primary">No Hay Tickets</p>
                                    )}
                               </div>
                               <button className="items-center text-lg font-bold mx-auto bg-secondary rounded-full py-2 px-6 text-primary inline-flex align-middle justify-between mt-4" onClick={showDiv} disabled={tickets.length===0}>Continuar<ArrowRightIcon className="size-6 ml-4 inline-block"/></button>
                            </div>
                            )}
                            {activeStep === 3 && (
                                <div className="flex flex-col justify-center align-middle items-center p-4 gap-8 text-center">
                                    <h1 className="font-bold text-5xl text-grayText">Confirmar Boletos</h1>
                                    <div className="flex flex-col">
                                        <div className="flex md:flex-wrap flex-col md:flex-row gap-2 mx-auto">
                                            <h1 className="my-auto text-2xl text-primary font-bold">Boletos Seleccionados:</h1>
                                            <ul className="flex flex-row gap-2 mx-auto md:mx-0">
                                            {tickets.map((ticket,index)=>(
                                                <div key={index} className="bg-secondary text-primary p-2 font-semibold rounded-md">{ticket.number}</div>
                                            ))}
                                            </ul>
                                        </div>
                                        <p className="text-2xl mt-6 text-primary font-bold">Nombre del Participante: {formData.name+" "+formData.lastName}</p>
                                        <p className="text-lg font-semibold text-primary">Para poder elegir tus boletos deberas tener a la mano tu comprobante de pago, en caso de no tenerlo puedes hacer una transferencia o un depósito a la siguente cuenta.</p>
                                        <p className="text-lg font-semibold text-primary">Nombre del Titular: <span>Carlos Cuevas Acosta</span></p>
                                        <p className="text-lg font-semibold text-primary">CLABE Interbancaria: <span>072150012785162537</span></p>
                                        <p className="text-lg font-semibold text-primary">BANORTE</p>
                                        <p className="text-2xl mt-6 text-primary font-bold"> Para continuar, sube una foto de tu comprobante de pago</p>
                                        <div className="flex flex-wrap mt-3">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                onChange={handleFileChange}
                                                hidden
                                            />
                                            <label htmlFor="file-upload" className="bg-secondary rounded-full text-primary flex flex-wrap align-middle items-center justify-start px-4 py-2 mx-auto text-xl cursor-pointer">
                                            Subir Imagen<CameraIcon className="size-8 ml-4"/>
                                            </label>
                                        </div>
                                        {selectedFile && (
                                            <p className="mx-auto mt-2 font-semibold text-xl text-primary">{selectedFile.name}</p>
                                        )}
                                        <button className="items-center text-lg font-bold mx-auto bg-secondary rounded-full py-2 px-6 text-primary inline-flex align-middle justify-between mt-4" onClick={handleUpload} disabled={!selectedFile}>Continuar<ArrowRightIcon className="size-6 ml-4 inline-block"/></button>
                                    </div>
                                </div>
                            )}
                            {activeStep === 4 && (
                                <div className="flex flex-col p-8 items-center gap-4">
                                    <h1 className="font-bold text-5xl text-grayText text-center">Boletos Seleccionados</h1>
                                    <p className="text-xl font-semibold text-primary">¡Tus Boletos han sido apartados!</p>
                                    <p className="text-xl font-semibold text-primary">Numero de Orden: {formData.orderNo} </p>
                                    <p></p>
                                    <div className="flex flex-wrap gap-2">
                                        <h1 className="my-auto text-2xl text-primary font-bold">Boletos Seleccionados:</h1>
                                        <ul className="flex flex-row gap-2">
                                        {tickets.map((ticket,index)=>(
                                            <div key={index} className="bg-secondary text-primary p-2 font-semibold rounded-md">{ticket.number}</div>
                                        ))}
                                        </ul>
                                    </div>
                                    <button className="items-center text-lg font-bold mx-auto bg-secondary rounded-full py-2 px-6 text-primary inline-flex align-middle justify-between mt-4" onClick={handleClickConfirm}>Confirmar Participación</button>
                                </div>
                            )}
                        </div>
                                        </section>
                                        <section id="videoPlayer" className="flex flex-col bg-primary">
                                            <VideoPlayer/>
                                        </section>
                    </div>
                )}
                {rifaStatus==='after' && (
                    <div className="h-[80vh] w-auto  flex flex-col align-middle items-center">
                    <div className="mx-auto my-auto text-center p-2">
                        <h1 className="md:text-8xl text-5xl font-extrabold text-secondary">Rifa Terminada</h1>
                        <h1 className="md:text-4xl text-2xl font-semibold text-terciary">La rifa ha terminado, checa nuestras redes sociales para los números ganadores</h1>
                    </div>
                </div>
                )}
                
            </main>
            <InfoRifa isOpen={isModalOpen} onClose={closeModal}/>
            <ContactFooter/>
            <Footer/>
        </div>
    );
}