import React, { useMemo, useState } from 'react';

const switchCatalog = [
    { id: 'sw-tplink-8', type: 'switch', name: 'Switch 8 Portas', brand: 'TP-Link', model: 'TL-SG108', variant: '8 portas', image: 'https://via.placeholder.com/120x60?text=8P' },
    { id: 'sw-cisco-24', type: 'switch', name: 'Switch 24 Portas', brand: 'Cisco', model: 'SG250-26', variant: '24 portas', image: 'https://via.placeholder.com/120x60?text=24P' },
];

function ClickableSwitch({ sw, onAdd }) {
    return (
        <div onClick={() => onAdd(sw)} className="flex items-center gap-3 p-3 rounded-lg border bg-white shadow-sm cursor-pointer hover:shadow-md hover:border-[#0077B6] transition-all">
            <img src={sw.image} alt={sw.name} className="w-16 h-10 object-cover rounded" />
            <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">{sw.name}</div>
                <div className="text-xs text-gray-500">{sw.brand} • {sw.model}</div>
            </div>
        </div>
    );
}

export default function SwitchPanel({ onClose, onAddEquipment, placedEquipments, onDeleteEquipment, onDuplicateEquipment }) {
    const [search, setSearch] = useState('');
    const filtered = useMemo(() => {
        if (search.length < 2) return switchCatalog;
        return switchCatalog.filter(s => `${s.name} ${s.model}`.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const projectSwitches = placedEquipments.filter(e => e.type === 'switch');

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} />
            <div className="fixed top-10 left-24 w-[420px] max-h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#d9e7f2] z-40">
                <div className="flex items-center justify-between px-6 pt-6">
                    <h2 className="text-2xl font-bold text-[#1f3347]">Switch</h2>
                </div>
                <div className="px-6 pb-6">
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-[#1f3347] mb-2">Pesquisar</h3>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Digite para pesquisar..." className="w-full p-3 rounded-xl border border-[#c9d9e6] focus:ring-2 focus:ring-[#00B5E2] outline-none" />
                    </div>
                    <div className="mt-6 space-y-3">
                        {filtered.map(sw => <ClickableSwitch key={sw.id} sw={sw} onAdd={onAddEquipment} />)}
                    </div>
                    <div className="mt-8 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-[#1f3347] mb-4">No projeto</h3>
                        {projectSwitches.length === 0 && <div className="text-sm text-gray-500">Nenhum switch adicionado.</div>}
                        <div className="space-y-4">
                            {projectSwitches.map(sw => (
                                <div key={sw.instanceId} className="flex items-center gap-3 p-3 bg-[#f5f9fc] rounded-xl border border-[#d9e7f2]">
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-800">{sw.name}</div>
                                        <div className="text-xs text-gray-500">{sw.brand} • {sw.model}</div>
                                    </div>
                                    <button onClick={() => onDuplicateEquipment(sw)} className="px-3 py-2 text-[#ff8c00] border border-[#ffd9a8] rounded-lg text-xs hover:bg-[#fff3e3]" title="Duplicar">📋</button>
                                    <button onClick={() => onDeleteEquipment(sw.instanceId)} className="px-3 py-2 text-[#d9363e] border border-[#f5b5b8] rounded-lg text-xs hover:bg-[#fde8e9]" title="Remover">🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
