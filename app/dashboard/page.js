'use client'
import React, { useEffect, useState } from "react";
// import axios from "@/lib/axiosConfig"

// import Header from "@/components/Header";
import HeaderD from "@/components/DashboardHeader"
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import InfoModal from "@/components/InfoModal";

import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";
export default function Dashboard(){
    const router = useRouter();
    useEffect(()=>{
        getUserInfo();
        getTickets();
        getCustomers();
        const token = localStorage.getItem('token');
        // if(!userData.name||!token){
        //     router.push('/dashboard/login')
        // }
    },[router]);
    const [userData,setUserData] = useState({
        name: "",
        userName : ""
    });
    const [ticketsData,setTicketsData]=useState({
        sold: 0,
        total: 0,
        lastUpdated: null
    });
    const [customers,setCustomers]=useState([]);
    const priceTicket = 50;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerId,setCustomerId] = useState('')

    const openModal = (customerId) => {
        setIsModalOpen(true);
        setCustomerId(customerId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };    
    const getUserInfo = async()=>{
        const token = localStorage.getItem('token')
        if(!token){
            alert('Not logged in');
            router.push('/dashboard/login');
        }else {
            const userString = localStorage.getItem('user');
        const userData = JSON.parse(userString);
        setUserData((prevData)=>({
            ...prevData,
            name: userData.name,
            userName: userData.username
        }));
        }
    }
    const getTickets = async()=>{
        try {
            const response = await axios.get('ticket/getAll')
            const data = response.data.data
            console.log(data);
            const total = data.length;
            const sold = data.filter((item)=>item.status==='sold').length;
            const lastUpdated = data
                .filter((item)=>item.status==='sold')
                .reduce((latest,ticket)=>new Date(ticket.updatedAt)>new Date(latest.updatedAt) ? ticket:latest, {updatedAt: '1970-01-01T00:00:00Z'})
                .number;
            console.log(lastUpdated);
            console.log(sold);
            console.log(total);
            setTicketsData({
                sold: sold,
                total: total,
                lastUpdated: lastUpdated
            })
        } catch(e){
            console.log(e);
        }
    }
    const getCustomers = async()=>{
        try {
            const response = await axios.get('customer/getCustomers')
            const data = response.data.data
            console.log(data);
            const filtered = data.map(item=>({
                id: item._id,
                name: item.name,
                phone: item.phone,
                orderNo: item.orderNumber,
                verified: item.verified
            }));
            setCustomers(filtered);
        } catch(e){
            console.log(e);
        }
    }
    return (
        <div>
            <HeaderD/>
            <main className="w-full bg-primary">
                <div className="flex flex-col">
                    <section id="login-section">
                        <div className="flex flex-col p-10">
                            <h1 className="text-secondary text-5xl font-bold">Bienvenido {userData.name}</h1>
                            <div id="buscar-cliente" className="align-right items-end mt-2 ml-auto">
                                <input type="search" placeholder="Buscar" className="p-2 rounded-lg font-semibold"></input>
                            </div>
                            <section id="dashboard-tables" className="md:grid md:grid-cols-5 flex flex-col gap-6 pt-6">
                                <div id="dashboard-left-tables" className="flex flex-col justify-between col-span-1">
                                    <div id="dashboard-table-tickets" className="bg-grayText rounded-xl shadow-lg p-4 items-center align-middle text-center flex flex-col gap-4">
                                        <h1 className="text-terciary font-bold text-2xl ">Boletos</h1>
                                        <h2 className="text-primary font-semibold text-xl">{ticketsData.sold} de {ticketsData.total}</h2>
                                        <ProgressBar sold={ticketsData.sold} total={ticketsData.total}/>
                                        <h2 className="text-primary font-semibold text-xl">Ultimo Vendido</h2>
                                        <p className="p-1 bg-secondary text-primary font-semibold text-xl rounded-md w-[30%] mx-auto">{ticketsData.lastUpdated}</p>
                                    </div>
                                    <div id="dashboard-table-costs" className="bg-grayText rounded-xl shadow-lg p-4 text-center items-center align-middle flex flex-col gap-4">
                                        <h1 className="text-terciary font-bold text-2xl ">Costos</h1>
                                        <h2 className="text-primary font-semibold text-xl">Costo del Boleto: ${priceTicket}</h2>
                                        <h2 className="text-primary font-semibold text-xl">Total Recaudado: ${ticketsData.sold*priceTicket}</h2>
                                    </div>
                                </div>
                                <div id="dashboard-right-table" className=" bg-grayText rounded-xl shadow-lg md:flex md:flex-col md:col-span-4 gap-2 overflow-x-auto">
                                    <h1 className="text-center text-terciary font-bold text-2xl">Clientes</h1>
                                    <table className="table-fixed md:mx-8 mx-2 mt-2 ">
                                        <thead>
                                            <tr className="font-bold text-xl text-terciary border-b-4 border-secondary">
                                                <th>Nombre</th>
                                                <th>Teléfono</th>
                                                <th>Numero de Orden</th>
                                                <th>Verificado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers.map(item=>(
                                                <tr key={item.id} className="text-center text-lg border-t-2 border-terciary/25">
                                                    <td className="text-terciary">{item.name}</td>
                                                    <td className="text-terciary">{item.phone}</td>
                                                    <td className="text-terciary">{item.orderNo?item.orderNo:'No Disponible'}</td>
                                                    <td className={item.verified ? 'text-secondary' : 'text-primary'}>{item.verified ? 'Verificado':'Pendiente'}</td>
                                                    <td className="text-terciary flex justify-center items-center align-middle">
                                                        <div className="flex space-x-2">
                                                            <button className="py-auto" onClick={()=> openModal(item.id)}>
                                                                <EyeIcon className="h-4 w-4 hover:scale-125 ease-in duration-300 hover:text-secondary"/>
                                                            </button>
                                                            <button className="my-auto">
                                                                <TrashIcon className="h-4 w-4 hover:scale-125 ease-in duration-300 hover:text-secondary"/>
                                                            </button>
                                                            <button className="my-auto">
                                                                <PencilSquareIcon className="h-4 w-4 hover:scale-125 ease-in duration-300 hover:text-secondary"/>
                                                            </button>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                        <form></form>
                    </section>
                </div>
            </main>
            <Footer/>
            <InfoModal isOpen={isModalOpen} onClose={closeModal} customerId={customerId}>
                <h2>Modal Titler</h2>
            </InfoModal>
        </div>
    )
}