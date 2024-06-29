'use client'
import React, { useEffect, useState } from "react";
// import axios from "@/lib/axiosConfig"

// import Header from "@/components/Header";
import HeaderD from "@/components/DashboardHeader"
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import InfoModal from "@/components/InfoModal";
import EditInfoModal from "@/components/EditInfo";
import DeleteCustomerModal from "@/components/DeleteCustomerModal";

import { EyeIcon, MagnifyingGlassCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
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
    const [ticketsInfo,setTicketsInfo]=useState([])
    const [customers,setCustomers]=useState([]);
    const priceTicket = 50;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customerId,setCustomerId] = useState('')

    const [searchTicketValue,setSearchTicketValue] = useState('')
    const [foundTicket,setFoundTicket] = useState(null);
    const [foundTicketCustomer,setFoundTicketCustomer] = useState(null);

    const [searchQuery,setSearchQuery] = useState('');


    const pageLimit = 20;

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredCustomers = searchCustomers(customers,searchQuery)
    function searchCustomers(customers,searchQuery){
        const lowerCaseQuery = searchQuery.toLowerCase();
        const searchWords = lowerCaseQuery.split(' ');

        return customers.filter(customer => {
            const customerName = customer.name.toLowerCase();
            const phoneMatches = customer.phone.includes(lowerCaseQuery);
            const nameMatches = searchWords.every(word => customerName.includes(word));

            return nameMatches || phoneMatches
        })
    }
    const handleTicket = (event) => {
        const value = event.target.value;
        if(/^\d{0,4}$/.test(value)){
            setSearchTicketValue(value);
        }
    }

    const searchForTicket = () => {
        if(searchTicketValue.length === 4){
            const ticket = ticketsInfo.find((item)=>(item.number)===searchTicketValue)
            // console.log('Ticket: '+foundTicket)
            setFoundTicket(ticket)
            setFoundTicketCustomer(findCustomerNameByTicket(customers,ticket._id));
        }
    }

    const findCustomerNameByTicket = (customers,ticket) => {
        for(const customer of customers){
            if(customer.tickets.includes(ticket)){
                return(customer.name);
                // console.log(customer.name)
            }
        }
        return(null);
    }
    const openModal = (customerId) => {
        setIsModalOpen(true);
        setCustomerId(customerId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };    
    const openEditModal = (customerId) => {
        setIsEditModalOpen(true);
        setCustomerId(customerId);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };    
    const openDeleteModal = (customerId) => {
        setIsDeleteModalOpen(true);
        setCustomerId(customerId);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        getCustomers();
        getTickets();
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
            // console.log(data);
            const total = data.length;
            const sold = data.filter((item)=>item.status==='sold').length;
            const lastUpdated = data
                .filter((item)=>item.status==='sold')
                .reduce((latest,ticket)=>new Date(ticket.updatedAt)>new Date(latest.updatedAt) ? ticket:latest, {updatedAt: '1970-01-01T00:00:00Z'})
                .number;
            // console.log(lastUpdated);
            // console.log(sold);
            // console.log(total);
            setTicketsData({
                sold: sold,
                total: total,
                lastUpdated: lastUpdated
            })
            setTicketsInfo(data);
        } catch(e){
            alert(e);
        }
    }
    const getCustomers = async()=>{
        try {
            const response = await axios.get('customer/getCustomers')
            const data = response.data.data
            // console.log(data);
            const filtered = data.map(item=>({
                id: item._id,
                name: item.name,
                phone: item.phone,
                orderNo: item.orderNumber,
                verified: item.verified,
                tickets: item.tickets
            }));
            setCustomers(filtered);
        } catch(e){
            alert(e);
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
                            <div id="buscar-cliente" className="align-right items-end mt-2 ml-auto hidden md:block">
                                <input type="search" placeholder="Buscar" className="p-2 rounded-lg font-semibold ring-secondary outline-secondary" value={searchQuery} onChange={handleSearch}></input>
                            </div>
                            <section id="dashboard-tables" className="md:grid md:grid-cols-5 flex flex-col gap-6 pt-6">
                                <div id="dashboard-left-tables" className="flex flex-col justify-between gap-4 col-span-1">
                                    <div id="dashboard-table-tickets" className="bg-grayText rounded-xl shadow-lg p-4 items-center align-middle text-center flex flex-col gap-4">
                                        <h1 className="text-terciary font-bold text-2xl ">Boletos</h1>
                                        <h2 className="text-primary font-semibold text-xl">{ticketsData.sold} de {ticketsData.total}</h2>
                                        <ProgressBar sold={ticketsData.sold} total={ticketsData.total}/>
                                        <h2 className="text-primary font-semibold text-xl">Ultimo Vendido</h2>
                                        <p className="p-1 bg-secondary text-primary font-semibold text-xl rounded-md w-[30%] mx-auto">{ticketsData.lastUpdated}</p>
                                        <div className="flex flex-row gap-2">
                                            <input id="search-tickets" type="text" className="bg-primary rounded-md p-2 font-semibold outline-secondary" placeholder="Buscar Boleto" value={searchTicketValue} onChange={handleTicket}></input>
                                            <button className="my-auto" onClick={searchForTicket}><MagnifyingGlassCircleIcon className="size-8 text-secondary"/></button>
                                        </div>
                                        {foundTicket && (
                                            <div className="mt-2">
                                                <div className={`font-semibold text-primary rounded-lg ${foundTicket.status==='sold'?'bg-secondary':'bg-terciary'}`}>{foundTicket.number}</div>
                                                <div className="font-semibold text-terciary">{foundTicket.status==='sold'?'Vendido':'Disponible'}</div>
                                                {foundTicketCustomer && (
                                                    <div className="font-semibold text-terciary mt-2">{foundTicketCustomer}</div>
                                                )}
                                            </div>
                                        )}
                                        

                                    </div>
                                    <div id="dashboard-table-costs" className="bg-grayText rounded-xl shadow-lg p-4 text-center items-center align-middle flex flex-col gap-4">
                                        <h1 className="text-terciary font-bold text-2xl ">Costos</h1>
                                        <h2 className="text-primary font-semibold text-xl">Costo del Boleto: ${priceTicket}</h2>
                                        <h2 className="text-primary font-semibold text-xl">Total Recaudado: ${ticketsData.sold*priceTicket}</h2>
                                    </div>
                                </div>
                                <div id="buscar-cliente-mobile" className="align-right items-end mt-2 ml-auto md:hidden block">
                                <input type="search" placeholder="Buscar" className="p-2 rounded-lg font-semibold ring-secondary outline-secondary" value={searchQuery} onChange={handleSearch}></input>
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
                                            {filteredCustomers.map(item=>(
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
                                                            <button className="my-auto" onClick={() => openDeleteModal(item.id)}>
                                                                <TrashIcon className="h-4 w-4 hover:scale-125 ease-in duration-300 hover:text-secondary"/>
                                                            </button>
                                                            <button className="my-auto" onClick={() => openEditModal(item.id)}>
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
            </InfoModal>
            <EditInfoModal isOpen={isEditModalOpen} onClose={closeEditModal} customerId={customerId}>
            </EditInfoModal>
            <DeleteCustomerModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} customerId={customerId}>
            </DeleteCustomerModal>
        </div>
    )
}