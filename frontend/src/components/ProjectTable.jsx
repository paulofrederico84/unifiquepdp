import React from 'react'

const mockCameras = [
    { id: 1, name: 'Câmera Frontal', model: 'AXIS P3225', location: 'Entrada', status: 'Ativa' },
    { id: 2, name: 'Câmera Garagem', model: 'Hikvision DS-2CD', location: 'Garagem', status: 'Ativa' }
]

export default function ProjectTable() {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Câmeras</h3>
                <div className="text-sm text-gray-500">2 itens</div>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-sm text-gray-500 border-b">
                        <th className="py-2">Nome</th>
                        <th className="py-2">Modelo</th>
                        <th className="py-2">Local</th>
                        <th className="py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockCameras.map(c => (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{c.name}</td>
                            <td className="py-2">{c.model}</td>
                            <td className="py-2">{c.location}</td>
                            <td className="py-2"><span className="text-sm text-green-600">{c.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
