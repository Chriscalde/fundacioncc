import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image";
import axios from "@/lib/axiosConfig";
export default function InfoModal ({isOpen,onClose,customerId}){
    const [customerData,setCustomerData] = useState({
        name: '',
        phone: '',
        tickets: [],
        imgURL: ''
    })
    useEffect(()=>{
        if(isOpen&&customerId){
            axios.get(`customer/get/${customerId}`)
            .then(response=>{
                const data = response.data.data;
                // console.log(data)
                setCustomerData(data);
            })
            .catch((e)=>{
                alert(e)
            });
        }
    },[isOpen,customerId])
    if(!isOpen) return null;
    return (
            <div className="fixed left-0 top-0 w-full h-full bg-terciary/50 z-50 overflow-auto backdrop-blur flex justify-center items-center ease-in-out duration-300">
                <div className="bg-secondary m-auto p-8 rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap justify-around gap-4">
                        <h3 className="font-bold text-xl text-primary">Información del Comprador</h3>
                        <button onClick={onClose} className="text-secondary"><XMarkIcon className="size-4 bg-primary rounded-full"/></button>
                    </div>
                        <label htmlFor="name" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Nombre</span>
                                <p className="bg-primary p-1 rounded-md text-secondary font-semibold text-xl">{customerData.name}</p>
                        </label>
                        <label htmlFor="phone" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Teléfono</span>
                                <p className="bg-primary p-1 rounded-md text-secondary font-semibold text-xl">{customerData.phone}</p>
                        </label>
                        <label htmlFor="tickets" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Boletos</span>
                                <ul className="flex flex-row gap-1">
                                    {customerData.tickets.map((ticket)=>(
                                        <li key={ticket._id} className="bg-primary p-1 rounded-md text-secondary font-semibold">{ticket.number}</li>
                                    ))}
                                </ul>
                        </label>
                        <h3 className="text-center">Transferencia</h3>
                        <Image src={customerData.imgURL} alt='Transfer Descripción' width={100} height={200}/>
                    </div>
                </div>
            </div>
    )
}