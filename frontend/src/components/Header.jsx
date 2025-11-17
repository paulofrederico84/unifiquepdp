import React from 'react'

export default function Header() {
    return (
        <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Substitua a URL abaixo pelo caminho da sua logo */}
                <img 
                    src="/logo-unifique.png" 
                    alt="Unifique" 
                    className="h-10 w-auto"
                />
                <div className="text-2xl font-bold text-[#0077B6]">PDP</div>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-sm text-gray-600 hover:text-gray-800">Configurações</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Entrar</button>
            </div>
        </header>
    )
}
