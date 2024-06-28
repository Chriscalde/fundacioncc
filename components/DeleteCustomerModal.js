import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image";
import axios from "@/lib/axiosConfig";
import CustomCheckbox from "./CustomCheckbox";
export default function DeleteCustomerModal ({isOpen,onClose,customerId}){
    const [customerData,setCustomerData] = useState({
        id: '',
        name: '',
        phone: '',
        tickets: [],
        imgURL: '',
        verified: null
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };
    const deleteCustomer = async()=>{
        try {
            const response = await axios.delete(`customer/deleteCustomer/${customerData._id}`,customerData);
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
                    <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-around gap-4">
                        <h3 className="font-bold text-xl text-primary">Eliminar Cliente</h3>
                        <button onClick={onClose} className="text-secondary"><XMarkIcon className="size-4 bg-primary rounded-full  cursor-pointer"/></button>
                    </div>
                        <label htmlFor="name" className="flex flex-row items-center align-middle gap-2">
                                <span className="text-primary text-2xl font-semibold">Nombre</span>
                                <input disabled className="bg-primary p-1 rounded-md text-secondary font-semibold text-xl" value={customerData.name} onChange={handleChange} name="name" id="name"></input>
                        </label>
                        
                        {/* <CustomCheckbox checked={customerData.verified}/> */}
                        <button onClick={deleteCustomer} className="p-2 text-lg bg-terciary rounded-xl mt-4 text-grayText font-semibold">Eliminar</button>
                    </div>
                </div>
            </div>
    )
}