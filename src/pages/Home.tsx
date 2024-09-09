import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <header className="flex justify-between items-center px-6 sm:px-10 md:px-20 lg:px-40 py-4 bg-blue-400 w-full h-[80px]">
        <p className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
          JACK <span className="font-bold text-lg sm:text-xl">Experts</span>
        </p>
        <nav className="flex gap-4 sm:gap-6 md:gap-8">
          <Link to="/login" className="text-sm sm:text-base md:text-lg font-bold hover:text-white">
            LOGIN
          </Link>
          <Link to="/register" className="text-sm sm:text-base md:text-lg font-bold hover:text-white">
            CADASTRE-SE
          </Link>
        </nav>
      </header>

      <main className="flex flex-col md:flex-row items-center h-screen w-full px-6 sm:px-10 md:px-20 lg:px-40 pt-[80px]">
        <div className="flex flex-col justify-center gap-4 p-6 bg-blue-100 w-full md:w-1/2 rounded-lg mb-6 md:mb-0">
          <p className="text-base sm:text-lg md:text-xl">
            Plataforma para Gestão de Projetos Digitais
          </p>
          <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Domine a Lucratividade de Seus Projetos e Aumente Seus Ganhos
          </p>
          <p className="font-medium text-lg sm:text-xl md:text-2xl">
            Descubra prejuízos com retrabalhos, controle as horas faturáveis e de
            custos dos seus serviços prestados.
          </p>
          <button className="p-3 sm:p-4 bg-blue-400 hover:bg-blue-300 rounded-lg font-bold text-center max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
            Teste por 7 dias de graça!
          </button>
        </div>
        <div className="flex justify-center w-full md:w-1/2 p-6">
          <a href="https://storyset.com/people" target="_blank" rel="noopener noreferrer">
            <img src="img2.png" alt="Imagem ilustrativa" className="max-w-full h-auto rounded-lg shadow-xl"/>
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
