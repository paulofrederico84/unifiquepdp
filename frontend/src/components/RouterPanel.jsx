import React, { useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';

const routerCatalog = [
  { id: 'rt-mikrotik-hexs', type: 'router', name: 'MikroTik hEX S', brand: 'MikroTik', model: 'hEX S', image: 'https://via.placeholder.com/120x60?text=hEX' },
  { id: 'rt-ubiq-edgerouter', type: 'router', name: 'Ubiquiti EdgeRouter X', brand: 'Ubiquiti', model: 'ER-X', image: 'https://via.placeholder.com/120x60?text=ER-X' },
];

function DraggableRouter({ rt }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'equipment',
    item: { ...rt },
    collect: (m) => ({ isDragging: m.isDragging() })
  }));
  return (
    <div ref={drag} className={`flex items-center gap-3 p-3 rounded-lg border bg-white shadow-sm cursor-move hover:shadow-md transition-all ${isDragging ? 'opacity-50' : ''}`}>
      <img src={rt.image} alt={rt.name} className="w-16 h-10 object-cover rounded" />
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-800">{rt.name}</div>
        <div className="text-xs text-gray-500">{rt.brand} • {rt.model}</div>
      </div>
    </div>
  );
}

export default function RouterPanel({ onClose, placedEquipments, onDeleteEquipment, onDuplicateEquipment }) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    if (search.length < 2) return routerCatalog;
    return routerCatalog.filter(s => `${s.name} ${s.model}`.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const projectRouters = placedEquipments.filter(e => e.type === 'router');

  return (
    <div className="fixed top-10 left-24 w-[420px] max-h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#d9e7f2] z-40">
      <div className="flex items-center justify-between px-6 pt-6">
        <h2 className="text-2xl font-bold text-[#1f3347]">Roteador</h2>
        <button onClick={onClose} className="w-10 h-10 rounded-full border border-[#00B5E2] text-[#0077B6] hover:bg-[#e6f7fc]">×</button>
      </div>
      <div className="px-6 pb-6">
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#1f3347] mb-2">Pesquisar</h3>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Digite para pesquisar..." className="w-full p-3 rounded-xl border border-[#c9d9e6] focus:ring-2 focus:ring-[#00B5E2] outline-none"/>
        </div>
        <div className="mt-6 space-y-3">
          {filtered.map(rt => <DraggableRouter key={rt.id} rt={rt} />)}
        </div>
        <div className="mt-8 pt-4 border-t">
          <h3 className="text-lg font-semibold text-[#1f3347] mb-4">No projeto</h3>
          {projectRouters.length === 0 && <div className="text-sm text-gray-500">Nenhum roteador adicionado.</div>}
          <div className="space-y-4">
            {projectRouters.map(rt => (
              <div key={rt.instanceId} className="flex items-center gap-3 p-3 bg-[#f5f9fc] rounded-xl border border-[#d9e7f2]">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{rt.name}</div>
                  <div className="text-xs text-gray-500">{rt.brand} • {rt.model}</div>
                </div>
                <button onClick={() => onDuplicateEquipment(rt)} className="px-3 py-2 text-[#ff8c00] border border-[#ffd9a8] rounded-lg text-xs hover:bg-[#fff3e3]" title="Duplicar">📋</button>
                <button onClick={() => onDeleteEquipment(rt.instanceId)} className="px-3 py-2 text-[#d9363e] border border-[#f5b5b8] rounded-lg text-xs hover:bg-[#fde8e9]" title="Remover">🗑️</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
