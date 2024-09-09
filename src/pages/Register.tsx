import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const obj = {
      name: name,
      email: email,
      password: password
    }

    console.log(obj);

    setName('');
    setEmail('');
    setPassword('');

    const register = async () => {
      try {
        const response = await fetch('https://api-jack-experts.onrender.com/userRegister', {
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
          console.log(data);
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
      }
    }
    register();
  }

  return (
    <main className="flex flex-col md:flex-row h-screen w-full">
      <div className="flex justify-center items-center bg-blue-300 w-full md:w-1/2 p-4 sm:p-6 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-[400px]"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Cadastro
          </h2>
          <label className="text-sm sm:text-base text-gray-600 font-medium">
            Nome
          </label>
          <input
            type="text"
            placeholder="Insira seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm sm:text-base text-gray-600 font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm sm:text-base text-gray-600 font-medium">
            Senha
          </label>
          <input
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Enviar
          </button>
          <p className="mt-4 text-center text-gray-600">
            Já possui uma conta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Faça login
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

export default Register