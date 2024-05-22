import Image from "next/image";
import logoCC from "../assets/img/logocc.png" 
import fbIcon from "../assets/svg/facebook1.svg"
import waIcon from "../assets/svg/whatsapp1.svg"
import style from "../styles/Home.module.css"
import Image2 from "../src/images/image1.jpeg"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-wrap bg-secondary w-full p-5">
        <div className="mr-auto">
          <Image src={logoCC} width={100} height={100}/>
        </div>
        <div className="my-auto flex flex-row">
          <a href="https://www.facebook.com/profile.php?id=100044643034540">
            <Image src={fbIcon} color="#DCDCDD" width={40} height={40} className="mx-5"/>
          </a>
          <a href="tel:+526394650034">
            <Image src={waIcon} color="#DCDCDD" width={40} height={40}/>
          </a>
        </div>
      </div>
      <div className={style.maindiv} >
          <div className="text-center my-auto">
            <h1 className="text-secondary text-6xl font-bold">Próximamente</h1>
            <h2 className="text-terciary text-2xl font-semibold italic">¡Algo Grande Está en Camino!</h2>
          </div>
      </div>
      <div className="bg-secondary flex flex-wrap h-10 w-full text-center justify-center items-center">
        <a className="text-primary text-center mx-auto my-3"> &copy; Fundación Carlos Cuevas 2024 | Desarrollado por <span>Raptor Devs</span></a>
      </div>
    </main>
  );
}
