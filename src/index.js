import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NoteState from "./context/notes/NoteState"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <NoteState>
      <App />
    </NoteState>
  </>
);
reportWebVitals();
