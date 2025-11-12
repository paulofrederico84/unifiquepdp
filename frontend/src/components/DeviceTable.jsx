import React from 'react'

const mockDevices = [
    { id: 1, name: 'Roteador Principal', model: 'TP-Link AX1500', ip: '192.168.1.1', status: 'Online' },
    { id: 2, name: 'Switch 8 portas', model: 'Cisco SF105', ip: '192.168.1.2', status: 'Online' }
]

export default function DeviceTable() {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Dispositivos</h3>
                <div className="text-sm text-gray-500">{mockDevices.length} itens</div>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-sm text-gray-500 border-b">
                        <th className="py-2">Nome</th>
                        <th className="py-2">Modelo</th>
                        <th className="py-2">IP</th>
                        <th className="py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockDevices.map(d => (
                        <tr key={d.id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{d.name}</td>
                            <td className="py-2">{d.model}</td>
                            <td className="py-2">{d.ip}</td>
                            <td className="py-2"><span className={`text-sm ${d.status === 'Online' ? 'text-green-600' : 'text-red-500'}`}>{d.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
