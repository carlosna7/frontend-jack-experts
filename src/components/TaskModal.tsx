import React, { useContext, useState } from 'react'
import AuthContext from '../context/tokenContext';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface JwtPayloadCustom extends JwtPayload {
  id: number;
}

interface TaskModalProps {
  closeModal: () => void;
  onTaskCreated: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ closeModal, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const authContext = useContext(AuthContext);
  const authToken = authContext?.authToken;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authToken) {
      console.error("Auth token is not available");
      return;
    }
    const decoded = jwtDecode<JwtPayloadCustom>(authToken)
    const taskData = {
      title: title,
      description: description,
      status: "incomplete",
      user_id: decoded.id
    }

    try {
      const response = await fetch('https://api-jack-experts.onrender.com/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify(taskData)
      });
      const data = await response.json();
      if (data) {
        onTaskCreated();
        closeModal();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div onClick={closeModal} className="fixed inset-0"></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-50 flex flex-col gap-4 w-[90%] max-w-[500px] p-6 md:p-8 bg-white rounded-md shadow-lg"
      >
        <label className="font-medium">Título</label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          type="text"
          value={title}
          placeholder="Digite o título da tarefa aqui!"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="font-medium">Descrição</label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          type="text"
          value={description}
          placeholder="Digite a descrição aqui!"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default TaskModal;