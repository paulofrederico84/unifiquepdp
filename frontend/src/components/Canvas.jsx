import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

const PlacedEquipment = ({ equipment, onSelect, isSelected, onMove, onCopy, onDelete }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenuPos({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
        onSelect(equipment.instanceId);
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // apenas botão esquerdo
        setIsDragging(true);
        const startX = e.clientX - equipment.x;
        const startY = e.clientY - equipment.y;

        const handleMouseMove = (moveEvent) => {
            const newX = moveEvent.clientX - startX;
            const newY = moveEvent.clientY - startY;
            onMove(equipment.instanceId, newX, newY);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const icons = {
        camera: '📹',
        switch: '🔌',
        nvr: '💾',
        router: '📡',
        cable: '🔗',
    };

    return (
        <>
            <div
                className={`absolute cursor-move select-none ${isSelected ? 'ring-2 ring-blue-500' : ''}
                    ${isDragging ? 'opacity-75' : ''}`}
                style={{
                    left: equipment.x,
                    top: equipment.y,
                    transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(equipment.instanceId);
                    setShowContextMenu(false);
                }}
                onMouseDown={handleMouseDown}
                onContextMenu={handleContextMenu}
            >
                <div className="bg-white border-2 border-gray-300 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-3xl">{icons[equipment.type] || '📦'}</div>
                    <div className="text-xs mt-1 text-center font-medium whitespace-nowrap">{equipment.name}</div>
                </div>
            </div>
            {showContextMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowContextMenu(false)}
                    />
                    <div
                        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[140px]"
                        style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCopy(equipment);
                                setShowContextMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                            <span>📋</span> Copiar
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(equipment.instanceId);
                                setShowContextMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                            <span>🗑️</span> Excluir
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default function Canvas({ placedEquipments, onAddEquipment, selectedId, onSelectEquipment, onMoveEquipment, onDeleteEquipment, backgroundImage, imageZoom = 1, imageRotation = 0 }) {
    const handleCopyEquipment = (equipment) => {
        onAddEquipment({
            ...equipment,
            instanceId: uuidv4(),
            x: equipment.x + 30,
            y: equipment.y + 30,
        });
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'equipment',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const canvasRect = document.getElementById('canvas-area').getBoundingClientRect();
            const x = offset.x - canvasRect.left;
            const y = offset.y - canvasRect.top;

            onAddEquipment({
                ...item,
                instanceId: uuidv4(),
                x,
                y,
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // Define o estilo de fundo baseado na presença de backgroundImage
    const backgroundStyle = backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
        : {
            backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        };

    // Estilo do container interno que aplica zoom e rotação
    const transformStyle = backgroundImage
        ? {
            transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
            transformOrigin: 'center',
            transition: 'transform 0.2s ease-out',
        }
        : {};

    return (
        <div
            ref={drop}
            id="canvas-area"
            className={`relative w-full h-full border-2 border-dashed rounded transition-colors overflow-hidden ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
            onClick={() => onSelectEquipment(null)}
        >
            {/* Camada de fundo com zoom e rotação */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ ...backgroundStyle, ...transformStyle }}
            />

            {/* Camada de equipamentos */}
            <div className="absolute inset-0 w-full h-full">
                {placedEquipments.map((eq) => (
                    <PlacedEquipment
                        key={eq.instanceId}
                        equipment={eq}
                        isSelected={eq.instanceId === selectedId}
                        onSelect={onSelectEquipment}
                        onMove={onMoveEquipment}
                        onCopy={handleCopyEquipment}
                        onDelete={onDeleteEquipment}
                    />
                ))}
                {placedEquipments.length === 0 && !isOver && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg pointer-events-none">
                        Arraste equipamentos da biblioteca para o canvas
                    </div>
                )}
            </div>
        </div>
    );
}
