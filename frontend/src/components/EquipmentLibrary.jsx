import React from 'react';
import { useDrag } from 'react-dnd';

const EquipmentItem = ({ equipment }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'equipment',
        item: { ...equipment },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const icons = {
        camera: '📹',
        switch: '🔌',
        nvr: '💾',
        router: '📡',
        cable: '🔗',
    };

    return (
        <div
            ref={drag}
            className={`p-3 mb-2 bg-white border-2 rounded cursor-move hover:border-blue-400 transition-all ${isDragging ? 'opacity-50 border-blue-500' : 'border-gray-200'
                }`}
        >
            <div className="flex items-center gap-2">
                <span className="text-2xl">{icons[equipment.type] || '📦'}</span>
                <div className="flex-1">
                    <div className="font-medium text-sm">{equipment.name}</div>
                    <div className="text-xs text-gray-500">{equipment.brand}</div>
                </div>
            </div>
        </div>
    );
};

export default function EquipmentLibrary({ onEquipmentSelect }) {
    const equipmentCategories = [
        {
            category: 'Câmeras',
            items: [
                { id: 'cam-dome', type: 'camera', name: 'Câmera Dome', brand: 'AXIS', model: 'M3004-V' },
                { id: 'cam-bullet', type: 'camera', name: 'Câmera Bullet', brand: 'Hikvision', model: 'DS-2CD2143G0-I' },
                { id: 'cam-ptz', type: 'camera', name: 'Câmera PTZ', brand: 'Dahua', model: 'SD59230U-HNI' },
            ],
        },
        {
            category: 'Rede',
            items: [
                { id: 'switch-8p', type: 'switch', name: 'Switch 8 Portas', brand: 'TP-Link', model: 'TL-SG108' },
                { id: 'switch-24p', type: 'switch', name: 'Switch 24 Portas', brand: 'Cisco', model: 'SG250-26' },
                { id: 'router-1', type: 'router', name: 'Roteador', brand: 'MikroTik', model: 'hEX S' },
            ],
        },
        {
            category: 'Gravação',
            items: [
                { id: 'nvr-8ch', type: 'nvr', name: 'NVR 8 Canais', brand: 'Hikvision', model: 'DS-7608NI-K2' },
                { id: 'nvr-16ch', type: 'nvr', name: 'NVR 16 Canais', brand: 'Intelbras', model: 'NVD 3116' },
            ],
        },
    ];

    return (
        <div className="h-full overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-white pb-2">Biblioteca de Equipamentos</h3>
            {equipmentCategories.map((category) => (
                <div key={category.category} className="mb-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2 uppercase">{category.category}</h4>
                    {category.items.map((item) => (
                        <EquipmentItem key={item.id} equipment={item} />
                    ))}
                </div>
            ))}
        </div>
    );
}
