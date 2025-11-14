import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import Editor from './pages/Editor';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/projects/:id/editor" element={<Editor />} />
      </Routes>
    </DndProvider>
  );
}
