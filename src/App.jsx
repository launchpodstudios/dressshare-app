import React, { useState } from 'react';

function App() {
  const [view, setView] = useState('browse');
  const tabs = ['Browse', 'My Borrows', 'My Dresses', 'Inbox', 'Guardian'];
  const current = view;
  return (
    <div className="p-4">
      <nav className="flex space-x-4 mb-4">
        {tabs.map(tab => {
          const key = tab.toLowerCase().replace(/\s+/g, '');
          return (
            <button
              key={tab}
              onClick={() => setView(key)}
              className={current === key ? 'font-bold underline' : ''}
            >
              {tab}
            </button>
          );
        })}
      </nav>
      {current === 'browse' && (
        <div>
          <h1 className="text-xl font-bold mb-2">Browse Dresses</h1>
          {/* TODO: list dresses from backend */}
          <p>No dresses yet.</p>
        </div>
      )}
      {current === 'myborrows' && (
        <div>
          <h1 className="text-xl font-bold mb-2">My Borrows</h1>
          <p>No borrows yet.</p>
        </div>
      )}
      {current === 'mydresses' && (
        <div>
          <h1 className="text-xl font-bold mb-2">My Dresses</h1>
          <p>No dresses yet.</p>
        </div>
      )}
      {current === 'inbox' && (
        <div>
          <h1 className="text-xl font-bold mb-2">Inbox</h1>
          <p>No messages.</p>
        </div>
      )}
      {current === 'guardian' && (
        <div>
          <h1 className="text-xl font-bold mb-2">Guardian Dashboard</h1>
          <p>Nothing to review.</p>
        </div>
      )}
    </div>
  );
}

export default App;
