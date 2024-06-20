'use client'
import React, { useEffect } from "react";
import axios from "@/lib/axiosConfig";
import axiosImg from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";

import Image from "next/image";
import Link from "next/link";

import p1 from "/assets/img/ip15.jpeg"
import p2 from "/assets/img/1000.jpeg"
import p3 from "/assets/img/500p.jpeg"

import {ArrowRightIcon, CameraIcon, ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/24/solid"

import { useState } from "react";
import tailwindConfig from "@/tailwind.config";
import { useRouter } from "next/navigation";
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
    
    useEffect(() => {
        fetchData();
        setIsMounted(true);
    },[]);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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
        console.log(imageTitle)
        try{
            const response = await axiosImg.put(`https://hnouee5av8.execute-api.us-east-1.amazonaws.com/test2/fundacion-images-bucket/${imageTitle}`,selectedFile,{
                headers:{
                    'Content-Type': 'image/jpeg',
                    'Accept':'*/*'
                }
            });

            if(response.status === 200){
                const imageUrl = `https://fundacion-images-bucket.s3.amazonaws.com/${imageTitle}`
                const resOrder = await axios.get('customer/getLastOrder')
                const lastOrder = resOrder.data.data.orderNumber
                console.log(lastOrder)
                setFormData((prevData)=>({
                    ...prevData,
                    imgURL: imageUrl,
                    verified: true,
                    orderNo: lastOrder+1
                }));
                setStep(activeStep+1);
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
            console.log(response);
            if(response && isMounted){
                router.push('rifas/confirmacion')
            }
        }catch(e){
            alert(e);
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
            console.log(response)
        } catch(e){
            console.log(e)
        }
    }

    const handleClickConfirm = () =>{
        createCustomer();
        updateTickets();
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

    const getRandomAvailableTicket = () =>{
        const availableTickets = availableNums.filter(item=>item.status === 'available');
        if (availableTickets.length > 0){
            const randomIndex = Math.floor(Math.random()*availableTickets.length);
            const randomTicket = availableTickets[randomIndex]
            setTickets(prevTickets=>[...prevTickets,randomTicket]);
        }
    }

    const [formData, setFormData] =useState({
        name: "",
        lastName: "",
        phone: "",
        tickets: [],
        imgURL: "",
        verified: null,
        orderNo : null
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
            return '#893737'; // Color rojo
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
            <Header/>
            <main className="w-full p-0 scroll-smooth">
                <section className="flex flex-col text-center bg-primary p-4" id="hero-rifas">
                    <h1 className="text-6xl text-terciary font-bold">RIFA iPhone 15 Pro Max</h1>
                    <h2 className="text-4xl text-secondary font-semibold">*15 de Junio</h2>
                    <h3 className="text-2xl text-secondary font-normal">Precio del Boleto: $50 Pesos</h3>
                    <div className="grid grid-cols-3 gap-24 items-center justify-center mx-auto" >
                        <div id="premioMayor" className="flex flex-col text-center mt-6">
                            <Image src={p1} className="rounded-2xl border-4 border-secondary shadow-xl" alt="p1" style={{width: "370px", height: "240px" ,objectFit: "cover"}}/>
                            <h2 className="font-bold text-secondary text-3xl mt-4">Premio Mayor</h2>
                            <p className="font-semibold text-secondary text-lg">iPhone 15 Pro Max</p>
                        </div>
                        <div id="premioMayor" className="flex flex-col text-center">
                            <Image src={p2} className="rounded-2xl border-4 border-secondary shadow-xl" alt="p2" style={{width: "370px", height: "240px" ,objectFit: "cover"}}/>
                            <h2 className="font-bold text-secondary text-3xl">Premio Mayor</h2>
                            <p className="font-semibold text-secondary text-lg">iPhone 15 Pro Max</p>
                        </div>
                        <div id="premioMayor" className="flex flex-col text-center">
                            <Image src={p3} className="rounded-2xl border-4 border-secondary shadow-xl" alt="p3" style={{width: "370px", height: "240px" ,objectFit: "cover"}}/>
                            <h2 className="font-bold text-secondary text-3xl">Premio Mayor</h2>
                            <p className="font-semibold text-secondary text-lg">iPhone 15 Pro Max</p>
                        </div>
                    </div>
                    <Link className="rounded-[20px] px-4 py-2 bg-secondary text-primary text-3xl mx-auto font-bold hover:bg-blueGray duration-300" href="#form-rifa" scroll={true}>PARTICIPAR</Link>
                    <button type="button" className="mt-4 border-4 border-terciary text-terciary font-semibold text-2xl mx-auto px-4 py-1 rounded-full hover:bg-terciary hover:text-primary duration-300">Mas Información</button>
                </section>
                <section className="pt-24 pb-24 bg-primary justify-center items-center scroll-smooth" id="form-rifa">
                    <div className="rounded-xl bg-terciary min-h-[400px] w-1/2 mx-auto">
                        {activeStep == 1 && (
                        <div className="flex flex-col justify-center align-middle items-center p-4 gap-2">
                           <h1 className="font-bold text-5xl text-grayText">Comprar Boletos</h1>
                           <form className="flex flex-col" onSubmit={showDiv}>
                            <label htmlFor="name" className="flex flex-col items-center align-middle">
                                <span className="text-primary text-3xl font-semibold">Nombre</span>
                                <input type="text" placeholder="Nombre" id="name" name="name" required value={formData.name} onChange={handleChange} className="py-1 px-4 ml-3 mt-2 rounded-full bg-grayText placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                            </label>
                            <label htmlFor="lastName" className="flex flex-col items-center align-middle">
                                <span className="text-primary text-3xl font-semibold">Apellido</span>
                                <input type="text" placeholder="Apellido" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className="py-1 px-4 ml-3 mt-2 rounded-full bg-grayText placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                            </label>
                            <label htmlFor="phone" className="flex flex-col items-center align-middle">
                                <span className="text-primary text-3xl font-semibold">Número Telefónico</span>
                                <input type="tel" placeholder="Número Telefónico" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="py-1 px-4 ml-3 mt-2 rounded-full bg-grayText placeholder:text-terciary focus:outline-secondary focus:ring-0 text-secondary" />
                            </label>
                            <button type="submit" className="items-center text-lg font-bold mx-auto bg-secondary rounded-full py-2 px-6 text-primary inline-flex align-middle justify-between mt-8">Continuar<ArrowRightIcon className="size-6 ml-4 inline-block"/></button>
                            </form> 
                        </div>
                        )}
                        {activeStep == 2 && (
                        <div className="flex flex-col justify-center align-middle items-center p-4 gap-8">
                           <h1 className="font-bold text-5xl text-grayText">Seleccionar Boletos</h1> 
                           <div className="grid grid-cols-10 gap-2">
                                {currentTickets.map((order)=>(
                                    <button key={order.id} className="p-2 text-terciary bg-primary rounded-md focus:outline-secondary focus:ring focus:ring-secondary" style={{
                                        color: getBackgroundColor(order.status),
                                        cursor: order.status === 'available' ? 'pointer' : 'not-allowed'
                                    }} onClick={()=>handleTicket(order)} disabled={order.status !== 'available' }>
                                        {order.number}
                                    </button>
                                ))}
                           </div>
                           <div className="mx-auto flex flex-wrap" id="page-control">
                                <button onClick={handlePreviousPage} disabled={currentPage===1} className="text-secondary disabled:text-grayText"><ChevronLeftIcon className="size-6"/></button>
                                <span className="text-primary font-semibold">Página {currentPage} de {totalPages}</span>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-secondary disabled:text-grayText"><ChevronRightIcon className="size-6"/></button>
                           </div>
                           <div className="flex flex-col justify-center items-center">
                            <h2 className="font-bold text-primary">Tickets Seleccionados</h2>
                                {tickets.length > 0 ? (
                                    <ul className="flex flex-row gap-2">
                                    {tickets.map((ticket,index)=>(
                                        <div key={index} className="bg-secondary text-primary p-2 font-semibold rounded-md">{ticket.number}</div>
                                    ))}
                                    </ul>
                                ):(
                                    <p className="font-bold text-primary">No Hay Tickets</p>
                                )}
                                <button onClick={getRandomAvailableTicket} className="mt-2 bg-secondary text-primary font-semibold p-2 rounded-full">Generar Numero Aleatorio</button>
                           </div>
                           <button className="items-center text-lg font-bold mx-auto bg-secondary rounded-full py-2 px-6 text-primary inline-flex align-middle justify-between mt-4" onClick={showDiv} disabled={tickets.length===0}>Continuar<ArrowRightIcon className="size-6 ml-4 inline-block"/></button>
                        </div>
                        )}
                        {activeStep === 3 && (
                            <div className="flex flex-col justify-center align-middle items-center p-4 gap-8">
                                <h1 className="font-bold text-5xl text-grayText">Confirmar Boletos</h1>
                                <div className="flex flex-col">
                                    <div className="flex flex-wrap gap-2">
                                        <h1 className="my-auto text-2xl text-primary font-bold">Boletos Seleccionados:</h1>
                                        <ul className="flex flex-row gap-2">
                                        {tickets.map((ticket,index)=>(
                                            <div key={index} className="bg-secondary text-primary p-2 font-semibold rounded-md">{ticket.number}</div>
                                        ))}
                                        </ul>
                                    </div>
                                    <p className="text-2xl mt-6 text-primary font-bold">Nombre del Participante: {formData.name+" "+formData.lastName}</p>
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
            </main>
            <ContactFooter/>
            <Footer/>
        </div>
    );
}