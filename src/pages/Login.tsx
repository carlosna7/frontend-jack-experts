import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const obj = {
      email,
      password
    };

    const login = async () => {
      const response = await fetch('https://api-jack-experts.onrender.com/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        const decoded = jwtDecode(data);
        if (decoded.exp) {
          const expirationDate = new Date(decoded.exp * 3600);
          document.cookie = `auth-token=${data}; expires=${expirationDate.toUTCString()}; path=/`;
        }
        navigate('/dashboard')
      }
    }
    login();
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full">
      <div className="flex justify-center items-center bg-blue-300 w-full md:w-1/2 p-4 sm:p-6 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-[400px] p-6 sm:p-8 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
            Entrar
          </h2>
          <label className="text-sm sm:text-base text-gray-600 font-medium">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="text-sm sm:text-base text-gray-600 font-medium">
            Senha
          </label>
          <input
            type="password"
            value={password}
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Enviar
          </button>
          <p className="mt-4 text-center text-gray-600">
            Não possui uma conta?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Faça seu cadastro
            </a>
          </p>
        </form>
      </div>

      <div className="flex justify-center items-center bg-gray-200 w-full md:w-1/2 p-4 sm:p-6 md:p-8">
        <a
          href="https://storyset.com/people"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="img1.png"
            alt="Imagem ilustrativa"
            className="max-w-full h-auto rounded-lg shadow-xl"
          />
        </a>
      </div>
    </main>
  )
}

export default Login