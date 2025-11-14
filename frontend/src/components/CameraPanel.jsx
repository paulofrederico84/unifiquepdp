import React, { useState, useMemo } from 'react';

const cameraCatalog = [
    { id: 'cam-bullet-ali', type: 'camera', name: 'ALIBI Bullet', brand: 'ALIBI Security', model: 'ALI-FB40-A', variant: 'Bullet', image: 'https://via.placeholder.com/120x60?text=Bullet' },
    { id: 'cam-dome-axis', type: 'camera', name: 'Axis Dome', brand: 'AXIS', model: 'M3004-V', variant: 'Dome', image: 'https://via.placeholder.com/120x60?text=Dome' },
    { id: 'cam-ptz-dahua', type: 'camera', name: 'Dahua PTZ', brand: 'Dahua', model: 'SD59230U-HNI', variant: 'PTZ', image: 'https://via.placeholder.com/120x60?text=PTZ' },
];

function ClickableCamera({ cam, onAdd }) {
    return (
        <div
            onClick={() => onAdd(cam)}
            className="flex items-center gap-3 p-3 rounded-lg border bg-white shadow-sm cursor-pointer hover:shadow-md hover:border-[#0077B6] transition-all"
        >
            <img src={cam.image} alt={cam.name} className="w-16 h-10 object-cover rounded" />
            <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">{cam.name}</div>
                <div className="text-xs text-gray-500">{cam.brand} • {cam.model}</div>
            </div>
        </div>
    );
}

export default function CameraPanel({ onClose, onAddEquipment, placedEquipments, onDeleteEquipment, onDuplicateEquipment }) {
    const [tab, setTab] = useState('catalog');
    const [search, setSearch] = useState('');
    const filtered = useMemo(() => {
        if (search.length < 3) return cameraCatalog;
        return cameraCatalog.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.model.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const projectCameras = placedEquipments.filter(e => e.type === 'camera');

    return (
        <>
            {/* Overlay para fechar ao clicar fora */}
            <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} />

            <div className="fixed top-10 left-24 w-[420px] max-h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#d9e7f2] z-40">
                <div className="flex items-center justify-between px-6 pt-6">
                    <h2 className="text-2xl font-bold text-[#1f3347]">Câmera</h2>
                </div>
                <div className="px-6 mt-4 flex gap-8 text-sm font-semibold">
                    <button className={`pb-2 border-b-2 ${tab === 'catalog' ? 'border-[#00B5E2] text-[#0096D6]' : 'border-transparent text-gray-500'}`} onClick={() => setTab('catalog')}>Catálogo</button>
                    <button className={`pb-2 border-b-2 ${tab === 'create' ? 'border-[#00B5E2] text-[#0096D6]' : 'border-transparent text-gray-500'}`} onClick={() => setTab('create')}>Criar novo</button>
                </div>
                {tab === 'catalog' && (
                    <div className="px-6 pb-6">
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-[#1f3347] mb-2">Pesquisar</h3>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Digite para pesquisar..."
                                className="w-full p-3 rounded-xl border border-[#c9d9e6] focus:ring-2 focus:ring-[#00B5E2] outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">Digite pelo menos 3 caracteres do nome ou modelo.</p>
                        </div>
                        <div className="mt-6 space-y-3">
                            {filtered.map(cam => <ClickableCamera key={cam.id} cam={cam} onAdd={onAddEquipment} />)}
                        </div>
                        <div className="mt-8 pt-4 border-t">
                            <h3 className="text-lg font-semibold text-[#1f3347] mb-4">No projeto</h3>
                            {projectCameras.length === 0 && <div className="text-sm text-gray-500">Nenhuma câmera adicionada.</div>}
                            <div className="space-y-4">
                                {projectCameras.map(cam => (
                                    <div key={cam.instanceId} className="flex items-center gap-3 p-3 bg-[#f5f9fc] rounded-xl border border-[#d9e7f2]">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800">{cam.name}</div>
                                            <div className="text-xs text-gray-500">{cam.brand} • {cam.model}</div>
                                        </div>
                                        <button
                                            onClick={() => onDuplicateEquipment(cam)}
                                            className="px-3 py-2 text-[#ff8c00] border border-[#ffd9a8] rounded-lg text-xs hover:bg-[#fff3e3]"
                                            title="Duplicar"
                                        >📋</button>
                                        <button
                                            onClick={() => onDeleteEquipment(cam.instanceId)}
                                            className="px-3 py-2 text-[#d9363e] border border-[#f5b5b8] rounded-lg text-xs hover:bg-[#fde8e9]"
                                            title="Remover"
                                        >🗑️</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {tab === 'create' && (
                    <div className="px-6 py-8 text-sm text-gray-500">
                        <p>Formulário para criação de novo modelo (em desenvolvimento).</p>
                    </div>
                )}
            </div>
        </>
    );
}
