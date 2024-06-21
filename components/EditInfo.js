import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image";
import axios from "@/lib/axiosConfig";
export default function EditInfoModal ({isOpen,onClose,customerId}){
    const [customerData,setCustomerData] = useState({
        id: '',
        name: '',
        phone: '',
        tickets: [],
        imgURL: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };
    const updateCustomer = async()=>{
        try {
            const response = await axios.put(`customer/updateInfo/${customerData._id}`,customerData);
            console.log(response.data);
            onClose();
        } catch(e) {
            console.log(e);
        }
    }
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
                        <h3 className="font-bold text-xl text-primary">Editar Información</h3>
                        <button onClick={onClose} className="text-secondary"><XMarkIcon className="size-4 bg-primary rounded-full  cursor-pointer"/></button>
                    </div>
                        <label htmlFor="name" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Nombre</span>
                                <input className="bg-primary p-1 rounded-md text-secondary font-semibold text-xl" value={customerData.name} onChange={handleChange} name="name" id="name"></input>
                        </label>
                        <label htmlFor="phone" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Teléfono</span>
                                <input className="bg-primary p-1 rounded-md text-secondary font-semibold text-xl" value={customerData.phone}></input>
                        </label>
                        <label htmlFor="tickets" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Boletos</span>
                                <ul className="flex flex-row gap-1">
                                    {customerData.tickets.map((ticket)=>(
                                        <li key={ticket._id} className="bg-primary p-1 rounded-md text-secondary font-semibold">{ticket.number}</li>
                                    ))}
                                </ul>
                        </label>
                        <h3 className="text-center font-semibold text-primary text-xl">Transferencia</h3>
                        <Image src={customerData.imgURL} alt='Transfer Descripción' width={100} height={200}/>
                        <button onClick={updateCustomer} className="p-2 text-lg bg-terciary rounded-full text-grayText font-semibold">Actualizar</button>
                    </div>
                </div>
            </div>
    )
}