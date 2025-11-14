import React from 'react';

// Nova Sidebar minimalista baseada em paleta azul
// Tons usados: fundo #12171d / item #1e252c / ativo #0077B6 / borda ativa #00B5E2
const tools = [
    { id: 'camera', label: 'Câmeras', icon: '🎥' },
    { id: 'switch', label: 'Switches', icon: '🖧' },
    { id: 'nvr', label: 'NVR', icon: '💾' },
    { id: 'router', label: 'Roteador', icon: '📡' },
];

export default function Sidebar({ activeTool, onSelect }) {
    return (
        <div className="h-full py-6 px-2 bg-[#12171d] w-20 flex flex-col items-center gap-4 rounded-xl shadow-xl">
            {tools.map(t => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center text-[11px] font-medium transition-all border select-none
                        ${activeTool === t.id ? 'bg-[#0077B6] text-white border-[#00B5E2] shadow-lg' : 'bg-[#1e252c] text-[#c9d9e6] border-[#2e3945] hover:bg-[#24313d]'}`}
                    title={t.label}
                >
                    <span className="text-xl">{t.icon}</span>
                    <span className="leading-none mt-1">{t.label}</span>
                </button>
            ))}
        </div>
    );
}
