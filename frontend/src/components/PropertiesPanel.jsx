import React, { useState } from 'react';
import CctvIconSprite from './CctvIconSprite.jsx';

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

    // Biblioteca de ícones baseada no sprite em /public/icons/cctv/cctv-sprite.svg
    const iconLibrary = [
        { id: 'bullet', label: 'Bullet' },
        { id: 'dome', label: 'Dome' },
        { id: 'turret', label: 'Turret' },
        { id: 'ptz', label: 'PTZ' },
        { id: 'box', label: 'Box' },
        { id: 'cube', label: 'Cube' },
        { id: 'fisheye', label: 'Fisheye' },
        { id: 'wifi-cam', label: 'Wi‑Fi Cam' },
        { id: 'lpr', label: 'LPR' },
        { id: 'nvr', label: 'NVR/DVR' },
        { id: 'switch-poe', label: 'Switch PoE' },
        { id: 'router', label: 'Roteador' },
        { id: 'monitor', label: 'Monitor' },
        { id: 'ceiling-ap', label: 'AP Teto' },
        { id: 'cable', label: 'Cabo' },
    ];

    return (
        <div className="h-full overflow-y-auto">
            {/* Abas */}
            <div className="flex gap-4 mb-4 pb-2 border-b">
                <button
                    onClick={() => setActiveTab('config')}
                    className={`pb-2 px-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'config'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    ⚙️ Configurações
                </button>
                <button
                    onClick={() => setActiveTab('appearance')}
                    className={`pb-2 px-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'appearance'
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
                            placeholder="Nome que aparecerá no tooltip"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>

                        {/* Opção: Imagem customizada */}
                        <div className="mb-3">
                            <label className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                handleChange('customIconImage', event.target.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-700">
                                        {selectedEquipment.customIconImage ? 'Alterar imagem' : 'Carregar imagem do arquivo'}
                                    </div>
                                    <div className="text-xs text-gray-500">PNG, JPG, GIF até 5MB</div>
                                </div>
                            </label>
                            {selectedEquipment.customIconImage && (
                                <button
                                    onClick={() => handleChange('customIconImage', null)}
                                    className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                                >
                                    Remover imagem customizada
                                </button>
                            )}
                        </div>

                        {/* Opção: Biblioteca de ícones (desabilitada se tiver imagem custom) */}
                        <div className={selectedEquipment.customIconImage ? 'opacity-50 pointer-events-none' : ''}>
                            <div className="text-xs text-gray-500 mb-2">Ou escolha um ícone da biblioteca:</div>
                            <div className="grid grid-cols-6 gap-2 p-3 border border-gray-200 rounded bg-white max-h-56 overflow-y-auto">
                                {iconLibrary.map(({ id, label }) => {
                                    const isSelected = selectedEquipment.icon === id && !selectedEquipment.customIconImage;
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => { handleChange('customIconImage', null); handleChange('icon', id); }}
                                            className={`w-14 h-14 flex items-center justify-center rounded transition-all hover:bg-blue-50 ${isSelected ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50'}`}
                                            title={label}
                                        >
                                            <CctvIconSprite name={id} size={28} color={selectedEquipment.iconColor || '#111111'} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Cor do ícone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cor do ícone</label>
                        <div className={selectedEquipment.customIconImage ? 'opacity-50 pointer-events-none' : ''}>
                            <div className="grid grid-cols-8 gap-2 mb-2">
                                {[
                                    { name: 'Preto', value: '#111111' },
                                    { name: 'Cinza', value: '#6B7280' },
                                    { name: 'Branco', value: '#FFFFFF' },
                                    { name: 'Azul', value: '#1D4ED8' },
                                    { name: 'Verde', value: '#059669' },
                                    { name: 'Vermelho', value: '#DC2626' },
                                    { name: 'Laranja', value: '#EA580C' },
                                    { name: 'Roxo', value: '#7C3AED' },
                                ].map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => handleChange('iconColor', color.value)}
                                        className={`w-8 h-8 rounded-full border transition-all ${(selectedEquipment.iconColor || '#111111') === color.value
                                            ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                                            : 'hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color.value, borderColor: color.value === '#FFFFFF' ? '#D1D5DB' : color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                            <div className="text-xs text-gray-500">Aplica-se aos ícones da biblioteca (não afeta imagens).</div>
                        </div>
                    </div>

                    {/* Proporção do símbolo dentro do círculo */}
                    <div className={selectedEquipment.customIconImage ? 'opacity-50 pointer-events-none' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Proporção do símbolo: <span className="font-normal text-gray-500">{Math.round((selectedEquipment.iconGlyphScale ?? 0.7) * 100)}%</span>
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="0.95"
                            step="0.05"
                            value={selectedEquipment.iconGlyphScale ?? 0.7}
                            onChange={(e) => handleChange('iconGlyphScale', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Menor</span>
                            <span>Maior</span>
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
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${(selectedEquipment.iconBgColor || '#3B82F6') === color.value
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
                                className="flex flex-col items-center justify-center rounded-full shadow-lg transition-all overflow-hidden"
                                style={{
                                    width: (selectedEquipment.iconSize || 48) + 16,
                                    height: (selectedEquipment.iconSize || 48) + 16,
                                    backgroundColor: selectedEquipment.customIconImage ? 'transparent' : (selectedEquipment.iconBgColor || '#3B82F6')
                                }}
                            >
                                {selectedEquipment.customIconImage ? (
                                    <img
                                        src={selectedEquipment.customIconImage}
                                        alt="Prévia"
                                        className="rounded-full"
                                        style={{
                                            width: (selectedEquipment.iconSize || 48) + 16,
                                            height: (selectedEquipment.iconSize || 48) + 16,
                                            objectFit: 'contain',
                                            objectPosition: 'center'
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <CctvIconSprite
                                            name={selectedEquipment.icon || 'bullet'}
                                            size={(selectedEquipment.iconSize || 48) * (selectedEquipment.iconGlyphScale ?? 0.7)}
                                            color={selectedEquipment.iconColor || '#111111'}
                                        />
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
