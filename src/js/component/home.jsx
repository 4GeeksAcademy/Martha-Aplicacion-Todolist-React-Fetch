import React, { useState, useEffect } from 'react';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@700&family=Roboto:ital,wght@0,100;0,400;1,100&display=swap');
</style>

function Home() {
  const [tasks, setTasks] = useState([]); // Estado para la lista de tareas
  const [task, setTask] = useState('');   // Estado para la tarea actual

  // Función para agregar una tarea a la lista
  const addTask = () => {
    if (task.trim() !== '') {
      const newTask = { label: task, done: true };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask(''); // Limpiar la tarea actual

      // Actualizar la lista en el servidor
      updateTaskList(updatedTasks);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Actualizar la lista en el servidor
    updateTaskList(updatedTasks);
  };

  // Obtener tareas de la API al cargar el componente
  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/MarthaK')
      .then(resp => resp.json())
      .then(data => {
        // Establecer las tareas obtenidas del servidor
        setTasks(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //Actuallizar la lista de tareas en el servidor 
  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/MarthaK' , {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    }) 
    .then(resp => resp.json())
    .then(data => {      
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  },[tasks]   
  )

  // Función para limpiar todas las tareas
  const clearTasks = () => {
    setTasks([]);

    // Actualizar la lista vacía en el servidor
    updateTaskList([]);
  };

  // Función para actualizar la lista de tareas en el servidor
  const updateTaskList = (updatedTasks) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/MarthaK', {
      method: 'PUT',
      body: JSON.stringify(updatedTasks),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Tareas actualizadas:', data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask(); // Las tareas se agregan cuando se presiona "Enter"
          }
        }}
        placeholder="Escribe tu tarea y presiona 'Enter' para empezar"
      />
      <button onClick={clearTasks}>Limpiar tareas</button>
      <ul>
        {tasks.length === 0 ? (
          <li>Aún no hay nada</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>              
                {task.label}
                <span
                  onClick={() => deleteTask(index)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                >
                  ❌
                </span>               
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
