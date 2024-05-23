'use client'
import Image from "next/image";
import logoCC from "../assets/img/logocc.png" 
import fbIcon from "../assets/svg/facebook1.svg"
import waIcon from "../assets/svg/whatsapp1.svg"
import styles from "../styles/Home.module.css"
import rLogo from "../assets/svg/raptorslogo.svg"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-normal bg-primary p-0">
      <div className="flex flex-wrap bg-secondary w-full p-2">
        <div className="mr-auto">
          <Image src={logoCC} width={100} height={100}/>
        </div>
        <div className="my-auto flex flex-row">
          <a href="https://www.facebook.com/profile.php?id=100044643034540" target="_blank" rel="noopener noreferrer">
            <Image src={fbIcon} color="#DCDCDD" width={40} height={40} className="mx-5"/>
          </a>
          <a href="tel:+526394650034">
            <Image src={waIcon} color="#DCDCDD" width={40} height={40}/>
          </a>
        </div>
      </div>
      <div className={styles.maindiv} >
          <div className="text-center my-auto">
            <h1 className="text-secondary md:text-6xl text-5xl font-bold">Próximamente</h1>
            <h2 className="text-primary md:text-2xl text-xl font-semibold italic">¡Algo Grande Está en Camino!</h2>
          </div>
      </div>
      <footer className="bg-secondary md:flex md:flex-row w-full text-center justify-center items-center align-middle py-4 md:py-2 bottom-0 h-full">
        <a href="https://raptordevs.com" target="_blank" rel="noopener noreferrer" className="text-primary mx-auto flex flex-grow justify-center items-center">
          <span className="mr-2">&copy; Fundación Carlos Cuevas | </span>
          Powered by {' '}
          <span className=" ">
            <Image src={rLogo} alt="logo" width={80} height={60}></Image>
          </span>
        </a>
      </footer>
    </main>
  );
}
