import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/`)
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 React + TypeScript + Nest + Prisma + PostgreSQL + Docker</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
