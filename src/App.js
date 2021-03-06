import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repo number ${Date.now()}`,
      owner: 'Lucas Lourenço',
    });

    const repositorie = response.data;
    setRepositories([... repositories, repositorie]);
  };

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      setRepositories(repositories.filter(repositorie => 
        repositorie.id !== id ));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => {
          return (
            <li key={repositorie.id}>
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
              {repositorie.title}
            </li>
          )})
        }
      </ul>

      <button
        className="btn-add"
        onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
