import React, { useState, useEffect } from 'react';
import { Persona, PersonaSize } from '@fluentui/react';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
}

export default function TeamDirectory() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5247/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Erreur users:', err));
  }, []);

  return (
    <div className="widget">
      <h2>Trombinoscope</h2>
      {users.map(user => (
        <div key={user.id} style={{ marginBottom: 12 }}>
          <Persona
            imageUrl={user.avatarUrl}
            text={user.name}
            secondaryText={user.role}
            tertiaryText={user.email}
            size={PersonaSize.size48}
          />
        </div>
      ))}
    </div>
  );
}