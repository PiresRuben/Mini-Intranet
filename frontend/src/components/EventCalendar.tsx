import React, { useState, useEffect } from 'react';
import { Icon } from '@fluentui/react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('http://localhost:5247/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Erreur events:', err));
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="widget">
      <h2>Événements</h2>
      {events.map(event => (
        <div key={event.id} style={{
          marginBottom: 12, padding: 10,
          border: '1px solid #eee', borderRadius: 6
        }}>
          <strong>{event.title}</strong>
          <p style={{ margin: '4px 0', fontSize: 13, color: '#555' }}>
            {event.description}
          </p>
          <small style={{ color: '#0078d4' }}>
            <Icon iconName="Clock" /> {formatDate(event.date)}
            {' · '}
            <Icon iconName="MapPin" /> {event.location}
          </small>
        </div>
      ))}
    </div>
  );
}