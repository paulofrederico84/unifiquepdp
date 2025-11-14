import React, { useState } from 'react';

export default function PropertiesPanel({ selectedEquipment, onUpdateProperty, onDelete }) {
    const [activeTab, setActiveTab] = useState('config');

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

    // Biblioteca de ícones
    const iconLibrary = [
        '📹', '🎬', '📷', '🎥', '📸',
        '🔌', '⚡', '🔋', '🔧', '🔩',
        '💾', '💿', '📀', '💽', '🖥',
        '📡', '📶', '🛰', '📢', '📻',
        '⚙️', '🔒', '🔑', '🚪', '🚨'
    ];

    return (
        <div className="h-full overflow-y-auto">
            {/* Abas */}
            <div className="flex gap-4 mb-4 pb-2 border-b">
                <button
                    onClick={() => setActiveTab('config')}
                    className={`pb-2 px-3 text-sm font-semibold border-b-2 transition-colors ${
                        activeTab === 'config'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    ⚙️ Configurações
                </button>
                <button
                    onClick={() => setActiveTab('appearance')}
                    className={`pb-2 px-3 text-sm font-semibold border-b-2 transition-colors ${
                        activeTab === 'appearance'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    🎨 Aparência
                </button>
            </div>

            <div className="text-sm text-gray-500 mb-4">{selectedEquipment.type.toUpperCase()}</div>

            {activeTab === 'config' && (
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
            )}

            {activeTab === 'appearance' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome de exibição</label>
                        <input
                            type="text"
                            value={selectedEquipment.displayName || selectedEquipment.name || ''}
                            onChange={(e) => handleChange('displayName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nome que aparecerá no ícone"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                        <div className="grid grid-cols-5 gap-2 p-3 border border-gray-200 rounded bg-gray-50 max-h-48 overflow-y-auto">
                            {iconLibrary.map((icon, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChange('icon', icon)}
                                    className={`w-10 h-10 flex items-center justify-center text-xl rounded hover:bg-blue-100 transition-colors ${
                                        (selectedEquipment.icon || '📹') === icon
                                            ? 'bg-blue-200 ring-2 ring-blue-500'
                                            : 'bg-white'
                                    }`}
                                    title={icon}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cor de fundo</label>
                        <div className="grid grid-cols-6 gap-2">
                            {[
                                { name: 'Azul', value: '#3B82F6' },
                                { name: 'Verde', value: '#10B981' },
                                { name: 'Vermelho', value: '#EF4444' },
                                { name: 'Amarelo', value: '#F59E0B' },
                                { name: 'Roxo', value: '#8B5CF6' },
                                { name: 'Rosa', value: '#EC4899' },
                                { name: 'Laranja', value: '#F97316' },
                                { name: 'Ciano', value: '#06B6D4' },
                                { name: 'Cinza', value: '#6B7280' },
                                { name: 'Preto', value: '#1F2937' },
                                { name: 'Branco', value: '#FFFFFF' },
                                { name: 'Teal', value: '#14B8A6' }
                            ].map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleChange('iconBgColor', color.value)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                                        (selectedEquipment.iconBgColor || '#3B82F6') === color.value
                                            ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                                            : 'hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: color.value, borderColor: color.value === '#FFFFFF' ? '#D1D5DB' : color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tamanho do ícone: <span className="font-normal text-gray-500">{selectedEquipment.iconSize || 48}px</span>
                        </label>
                        <input
                            type="range"
                            min="32"
                            max="96"
                            step="4"
                            value={selectedEquipment.iconSize || 48}
                            onChange={(e) => handleChange('iconSize', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Pequeno (32px)</span>
                            <span>Grande (96px)</span>
                        </div>
                    </div>

                    {/* Prévia do ícone */}
                    <div className="pt-4 border-t">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prévia</label>
                        <div className="flex items-center justify-center p-6 bg-gray-50 rounded">
                            <div
                                className="flex flex-col items-center justify-center rounded-full shadow-lg transition-all"
                                style={{
                                    width: (selectedEquipment.iconSize || 48) + 16,
                                    height: (selectedEquipment.iconSize || 48) + 16,
                                    backgroundColor: selectedEquipment.iconBgColor || '#3B82F6'
                                }}
                            >
                                <div style={{ fontSize: (selectedEquipment.iconSize || 48) * 0.5 }}>
                                    {selectedEquipment.icon || '📹'}
                                </div>
                                {(selectedEquipment.displayName || selectedEquipment.name) && (
                                    <div
                                        className="mt-1 text-white font-medium text-center px-1"
                                        style={{ fontSize: Math.max(8, (selectedEquipment.iconSize || 48) * 0.15) }}
                                    >
                                        {(selectedEquipment.displayName || selectedEquipment.name).substring(0, 12)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
