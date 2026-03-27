import React, { useState } from 'react';
import { PrimaryButton, TextField } from '@fluentui/react';

export default function AiPanel() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("Erreur : le service IA n'est pas accessible.");
    }
    setLoading(false);
  };

  return (
    <div className="widget">
      <h2>Assistant IA</h2>
      <TextField
        placeholder="Posez une question..."
        value={message}
        onChange={(_, v) => setMessage(v || '')}
        multiline rows={2}
      />
      <PrimaryButton
        text={loading ? "Réflexion..." : "Envoyer"}
        onClick={handleChat}
        disabled={loading}
        style={{ marginTop: 10 }}
      />
      {response && (
        <div style={{
          marginTop: 12, padding: 10,
          background: '#f0f6ff', borderRadius: 6, fontSize: 14
        }}>
          {response}
        </div>
      )}
    </div>
  );
}