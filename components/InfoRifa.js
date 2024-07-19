import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react"
export default function InfoRifa ({isOpen,onClose}){
    useEffect(()=>{
        
    },[isOpen])
    if(!isOpen) return null;
    return (
            <div className="fixed left-0 top-0 w-full h-full bg-terciary/50 z-50 overflow-auto backdrop-blur flex justify-center items-center ease-in-out duration-300">
                <div className="bg-secondary md:w-1/2 w-[90%] md:mx-2 mx-0 p-8 rounded-xl">
                    <div className="flex flex-col items-center gap-2 text-center">
                    <div className="md:grid md:grid-cols-3 flex flex-row justify-between gap-4">
                        <h3 className="font-bold text-xl text-primary md:col-start-2 text-nowrap">Información de la Rifa</h3>
                        <button onClick={onClose} className="text-secondary ml-auto"><XMarkIcon className="size-4 bg-primary rounded-full  cursor-pointer"/></button>
                    </div>
                        <p className="text-xl font-semibold text-grayText">Rifa del 15 de Junio</p>
                        <div className="flex flex-row justify gap-8 ">
                            <div>
                                <p className="text-lg font-semibold text-primary">Premio Mayor</p>
                                <p className="text-lg font-semibold text-primary">iPhone 15 Pro Max</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-primary">Segundo Premio</p>
                                <p className="text-lg font-semibold text-primary">$1000 pesos</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-primary">Tercer Premio</p>
                                <p className="text-lg font-semibold text-primary">$500 pesos</p>
                            </div>
                        </div>
                        <p className="text-md font-semibold text-primary">Costo del Boleto: $50 pesos</p>
                        <p className="text-xl font-bold text-primary mt-2">¿Cómo funciona la dinámica?</p>
                        <p className="text-lg font-semibold text-primary">La dinámica de la rifa consiste en que el día de la rifa será anunciado el ganador dependiendo de los números de la Lotería Nacional.</p>
                        <p className="text-lg font-semibold text-primary">Asegúrate de estar atento a la fecha de la rifa y revisa nuestras redes sociales para más información. ¡Buena suerte a todos los participantes!</p>
                        <p className="text-lg font-semibold text-primary">Para poder elegir tus boletos deberas tener a la mano tu comprobante de pago, en caso de no tenerlo puedes hacer una transferencia o un depósito a la siguente cuenta.</p>
                        <p className="text-lg font-semibold text-primary">Nombre del Titular: <span>Carlos Cuevas Acosta</span></p>
                        <p className="text-lg font-semibold text-primary">Número de Tarjeta: <span>4189140050575827</span></p>
                        <p className="text-lg font-semibold text-primary">CLABE Interbancaria: <span>072150012785162537</span></p>
                        <p className="text-lg font-semibold text-primary">BANORTE</p>


                    </div>
                </div>
            </div>
    )
}