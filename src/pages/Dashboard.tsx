import { useContext, useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AuthContext from "../context/tokenContext";
import { jwtDecode, JwtPayload } from "jwt-decode";
import TaskModal from "../components/TaskModal";

interface ITasks {
  id: number;
  title: string;
  description: string;
  status: string;
  user_id: number;
}

interface JwtPayloadCustom extends JwtPayload {
  id: number;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [user, setUser] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const authToken = authContext?.authToken;
  const userLogout = authContext?.logout;

  // recebe as tasks aqui
  useEffect(() => {
    if (!authToken) {
      console.error("Auth token is not available");
      return;
    }
    const decoded = jwtDecode<JwtPayloadCustom>(authToken)
    const fetchTasks = async () => {
      try {
        const response = await fetch(`https://api-jack-experts.onrender.com/getTasks?id=${decoded.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data: ITasks[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const getUser = async () => {
      try {
        const response = await fetch(`https://api-jack-experts.onrender.com/getUser?id=${decoded.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchTasks();
    getUser();
  }, [authToken]);

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch('https://api-jack-experts.onrender.com/deleteTask', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify({ id: taskId })
      });
      await response.json();
      // Filtra a lista de tarefas para remover a tarefa excluída
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const completeTask = async (taskId: number) => {
    try {
      const response = await fetch('https://api-jack-experts.onrender.com/completeTask', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify({ id: taskId })
      });
      if (!response.ok) {
        throw new Error('Failed to complete task');
      }

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? ({ ...task, status: 'completed' }) : task
        )
      );

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleGetTask = async () => {
    if (!authToken) {
      console.error('Auth token is not available');
      return;
    }
    const decoded = jwtDecode<JwtPayloadCustom>(authToken);

    try {
      const response = await fetch(`https://api-jack-experts.onrender.com/getTasks?id=${decoded.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data: ITasks[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const filterTasks = () => {
    return tasks.filter(task => showCompleted ? task.status === 'completed' : task.status !== 'completed');
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <main className="flex flex-col md:flex-row h-screen w-screen bg-white">
      {/* Navegação lateral responsiva */}
      <nav className="flex flex-col gap-8 md:gap-28 bg-blue-300 h-auto md:h-full w-full md:w-[260px] p-4">
        <Link
          to="/Dashboard"
          className="font-extrabold text-3xl md:text-4xl"
        >
          JACK <span className="font-bold text-xl">Experts</span>
        </Link>
        <ul className="flex flex-col gap-4 md:gap-8">
          <li
            className="flex items-center gap-4 text-2xl md:text-3xl cursor-pointer"
            onClick={() => setShowCompleted(false)}
          >
            <FaBars />
            <p className="text-lg">Tarefas</p>
          </li>
          <li
            className="flex items-center gap-4 text-2xl md:text-3xl cursor-pointer"
            onClick={() => setShowCompleted(true)}
          >
            <FaBars />
            <p className="text-lg">Completas</p>
          </li>
        </ul>
      </nav>

      {/* Área principal */}
      <div className="flex flex-col h-full w-full px-4 md:px-8 pb-16">
        <header className="flex flex-col md:flex-row items-center justify-between h-32 md:h-40 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            {capitalizeFirstLetter(user)}
          </h1>
          <ul className="flex gap-6">
            <li className="text-2xl md:text-3xl">
              <FaUser onClick={userLogout} />
            </li>
          </ul>
        </header>

        {/* Seção de Tarefas */}
        <section className="flex flex-col items-end bg-blue-300 h-full w-full p-4 rounded-2xl gap-4 overflow-auto">
          <div className="flex gap-4 md:gap-8">
            <button
              onClick={openModal}
              className="flex justify-center text-sm md:text-md font-bold bg-green-400 hover:bg-green-300 w-[160px] md:w-[200px] p-2 md:p-4 rounded-md"
            >
              CRIAR TAREFA
            </button>
          </div>

          <table className="w-full rounded-lg overflow-auto">
            <thead className="sticky top-0 bg-white">
              <tr className="flex items-center gap-4 md:gap-8 w-full h-14 p-2">
                <th className="text-left font-semibold">Título</th>
                <th className="text-left font-semibold">Status</th>
                <th className="text-left font-semibold">Descrição</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-4 pt-8">
              {filterTasks().length > 0 ? (
                filterTasks().map((task) => (
                  <tr
                    key={task.id}
                    className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 bg-white w-full h-14 p-2 rounded-lg"
                  >
                    <td className="font-semibold">{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.description}</td>
                    <td className="ml-auto flex gap-2 md:gap-4">
                      {task.status === "completed" ? (
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="bg-red-500 px-2 py-1 md:px-3 rounded-md"
                        >
                          Excluir
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => completeTask(task.id)}
                            className="bg-green-500 px-2 py-1 md:px-3 rounded-md"
                          >
                            Completar
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="bg-red-500 px-2 py-1 md:px-3 rounded-md"
                          >
                            Excluir
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center p-4">Nenhuma tarefa disponível</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
      {isOpen && <TaskModal closeModal={closeModal} onTaskCreated={handleGetTask} />}
    </main>

  )
}

export default Dashboard;
