import React, { useState, useEffect } from 'react';
import { initializeIcons } from '@fluentui/react';
import NewsFeed from './components/NewsFeed';
import TeamDirectory from './components/TeamDirectory';
import EventCalendar from './components/EventCalendar';
import SearchBar from './components/SearchBar';
import AiPanel from './components/AiPanel';
import './App.css';

initializeIcons();

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini Intranet</h1>
        <p>Digital Workplace</p>
      </header>

      <SearchBar />

      <div className="widgets-grid">
        <NewsFeed />
        <TeamDirectory />
        <EventCalendar />
        <AiPanel />
      </div>
    </div>
  );
}

export default App;