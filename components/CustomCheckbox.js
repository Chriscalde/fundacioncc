import React,{useState} from "react";
import '../styles/checkbox.style.css'

export default function CustomCheckbox({checked}){
    const [verified, setVerified] = useState(checked);

    const handleCheckboxChange = () => {
    const newVerifiedState = !verified;
    setVerified(newVerifiedState);

    // Aquí podrías llamar a una función para actualizar el estado en el servidor
    // updateCustomerVerification(customer.id, newVerifiedState);
    };
    return (
        <label className="flex items-center space-x-2">
        <span className="text-2xl font-semibold text-grayText">Verificado:</span>
        <div className="relative">
          <input
            type="checkbox"
            className="opacity-0 absolute h-6 w-6"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <div
            className={`bg-primary p-1 rounded-md text-xl flex items-center justify-center`}
            style={{ width: '1.25rem', height: '1.25rem' }}
          >
            {verified && (
              <span
                className={`text-secondary`}
                style={{ fontSize: '0.75rem', lineHeight: '1rem' }}
              >
                ✔
              </span>
            )}
            {!verified && (
              <span
                className={`text-terciary`}
                style={{ fontSize: '0.75rem', lineHeight: '1rem' }}
              >
                ✔
              </span>
            )}
          </div>
        </div>
      </label>
    )
}