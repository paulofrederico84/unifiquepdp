import React from 'react';

export default function PropertiesPanel({ selectedEquipment, onUpdateProperty, onDelete }) {
    if (!selectedEquipment) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Selecione um equipamento para ver propriedades
            </div>
        );
    }

    const handleChange = (field, value) => {
        onUpdateProperty(selectedEquipment.instanceId, field, value);
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="mb-4 pb-4 border-b">
                <h3 className="text-lg font-semibold mb-2">Propriedades</h3>
                <div className="text-sm text-gray-500">{selectedEquipment.type.toUpperCase()}</div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                        type="text"
                        value={selectedEquipment.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <input
                        type="text"
                        value={selectedEquipment.brand || ''}
                        onChange={(e) => handleChange('brand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                    <input
                        type="text"
                        value={selectedEquipment.model || ''}
                        onChange={(e) => handleChange('model', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">X</label>
                        <input
                            type="number"
                            value={Math.round(selectedEquipment.x) || 0}
                            onChange={(e) => handleChange('x', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Y</label>
                        <input
                            type="number"
                            value={Math.round(selectedEquipment.y) || 0}
                            onChange={(e) => handleChange('y', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {selectedEquipment.type === 'camera' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resolução</label>
                            <select
                                value={selectedEquipment.resolution || '1080p'}
                                onChange={(e) => handleChange('resolution', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                                <option value="4K">4K</option>
                                <option value="8MP">8MP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ângulo de Visão</label>
                            <input
                                type="text"
                                value={selectedEquipment.angle || '90°'}
                                onChange={(e) => handleChange('angle', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </>
                )}

                {selectedEquipment.type === 'switch' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Portas</label>
                        <input
                            type="number"
                            value={selectedEquipment.ports || 8}
                            onChange={(e) => handleChange('ports', parseInt(e.target.value) || 8)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                    <textarea
                        value={selectedEquipment.notes || ''}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Notas adicionais..."
                    />
                </div>

                <div className="pt-4 border-t">
                    <button
                        onClick={() => onDelete(selectedEquipment.instanceId)}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
                    >
                        Remover Equipamento
                    </button>
                </div>
            </div>
        </div>
    );
}
