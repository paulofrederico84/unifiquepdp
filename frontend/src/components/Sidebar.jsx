import React from 'react';
import { Link } from 'react-router-dom';

// Menu lateral de Ações Rápidas (Quick Actions)
// Cores: unifique-blue (#0077B6), unifique-green (#00B5E2)
const quickActions = [
    { id: 'new-project', label: 'Novo Projeto', icon: '➕', to: '/projects/new' },
    { id: 'open-project', label: 'Abrir Projeto', icon: '📂', to: '/' },
    { id: 'reports', label: 'Relatório', icon: '📊', to: '/reports' },
    { id: 'docs', label: 'Documentação', icon: '📖', to: '/docs' },
];

export default function Sidebar() {
    return (
        <div className="m-4 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-[#0077B6] mb-4">Ações Rápidas</h3>
            <div className="flex flex-col gap-3">
                {quickActions.map(action => (
                    <Link
                        key={action.id}
                        to={action.to}
                        className="flex items-center gap-3 px-4 py-3 bg-[#0077B6] hover:bg-[#005f8f] text-white rounded-lg transition-all shadow-sm font-medium"
                    >
                        <span className="text-xl">{action.icon}</span>
                        <span>{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}