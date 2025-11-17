import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import CctvIconSprite from './CctvIconSprite.jsx';

const PlacedEquipment = ({ equipment, onSelect, isSelected, onMove, onCopy, onDelete, onContextMenu }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(equipment.instanceId);
        // Passar evento para o Canvas gerenciar o menu
        if (onContextMenu) {
            onContextMenu(e, equipment);
        }
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // apenas botão esquerdo
        e.stopPropagation();
        setIsDragging(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const startEquipX = equipment.x;
        const startEquipY = equipment.y;

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            onMove(equipment.instanceId, startEquipX + deltaX, startEquipY + deltaY);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const defaultIcons = {
        camera: 'bullet',
        switch: 'switch-poe',
        nvr: 'nvr',
        router: 'router',
        cable: 'cable',
    };

    const iconSize = equipment.iconSize || 48;
    const iconBgColor = equipment.iconBgColor || '#3B82F6';
    const iconBgTransparency = equipment.iconBgTransparency ?? 0;
    const displayIcon = equipment.icon || defaultIcons[equipment.type] || 'bullet';
    const displayName = equipment.displayName || equipment.name || equipment.type;
    const customImage = equipment.customIconImage;

    // Converter cor hex para rgba com opacidade (transparência invertida)
    const hexToRgba = (hex, transparency) => {
        const opacity = 1 - transparency; // 0% transparência = 100% opacidade
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const bgColorWithOpacity = customImage ? 'transparent' : hexToRgba(iconBgColor, iconBgTransparency);

    return (
        <>
            <div
                className={`absolute cursor-move select-none group ${isDragging ? 'opacity-75' : ''
                    }`}
                style={{
                    left: equipment.x,
                    top: equipment.y,
                    transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(equipment.instanceId);
                }}
                onMouseDown={handleMouseDown}
                onContextMenu={handleContextMenu}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Ícone do equipamento */}
                <div
                    className="flex flex-col items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden"
                    style={{
                        width: iconSize + 16,
                        height: iconSize + 16,
                        backgroundColor: bgColorWithOpacity
                    }}
                >
                    {customImage ? (
                        <img
                            src={customImage}
                            alt={displayName}
                            className="rounded-full"
                            style={{
                                width: iconSize + 16,
                                height: iconSize + 16,
                                objectFit: 'contain',
                                objectPosition: 'center'
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <CctvIconSprite
                                name={displayIcon}
                                size={iconSize * (equipment.iconGlyphScale ?? 0.7)}
                                color={equipment.iconColor || '#111111'}
                            />
                        </div>
                    )}
                </div>

                {/* Tooltip com informações - aparece apenas no hover */}
                {showTooltip && !isDragging && (
                    <div
                        className="absolute z-50 px-4 py-3 bg-gray-900 text-white rounded-lg shadow-2xl pointer-events-none whitespace-nowrap"
                        style={{
                            top: iconSize + 24,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            minWidth: '200px'
                        }}
                    >
                        <div className="font-bold text-base mb-1">{displayName}</div>
                        {equipment.brand && equipment.model && (
                            <div className="text-sm text-gray-300">
                                {equipment.brand}
                                <br />
                                {equipment.model}
                            </div>
                        )}
                        {/* Seta do tooltip */}
                        <div
                            className="absolute w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900"
                            style={{
                                top: '-8px',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );

};

export default function Canvas({ placedEquipments, onAddEquipment, selectedId, onSelectEquipment, onMoveEquipment, onDeleteEquipment, backgroundImage, imageZoom = 1, imageRotation = 0, imageOffsetX = 0, imageOffsetY = 0, onOffsetChange }) {
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [contextMenu, setContextMenu] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handleCopyEquipment = (equipment) => {
        onAddEquipment({
            ...equipment,
            instanceId: uuidv4(),
            x: equipment.x + 30,
            y: equipment.y + 30,
        });
        setContextMenu(null);
    };

    const handleEquipmentContextMenu = (e, equipment) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            equipment: equipment
        });
    };

    const handleCanvasMouseDown = (e) => {
        // Só inicia pan se tiver imagem e zoom > 1, e clicar com botão esquerdo no fundo (não em equipamentos)
        const isCanvasBackground = e.target.id === 'canvas-area' || e.target.id === 'equipment-layer' || e.target.id === 'background-layer';
        if (backgroundImage && imageZoom > 1 && e.button === 0 && isCanvasBackground) {
            setIsPanning(true);
            setPanStart({ x: e.clientX - imageOffsetX, y: e.clientY - imageOffsetY });
            e.preventDefault();
        }
    };

    const handleCanvasMouseMove = (e) => {
        if (isPanning && onOffsetChange) {
            const newX = e.clientX - panStart.x;
            const newY = e.clientY - panStart.y;
            onOffsetChange(newX, newY);
        }
    };

    const handleCanvasMouseUp = () => {
        setIsPanning(false);
    };

    useEffect(() => {
        if (isPanning) {
            const moveHandler = (e) => {
                if (onOffsetChange) {
                    const newX = e.clientX - panStart.x;
                    const newY = e.clientY - panStart.y;
                    onOffsetChange(newX, newY);
                }
            };
            const upHandler = () => setIsPanning(false);

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
            return () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            };
        }
    }, [isPanning, panStart, onOffsetChange]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'equipment',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const canvasRect = document.getElementById('canvas-area').getBoundingClientRect();

            // Posição simples relativa ao canvas (equipamentos já estão na camada transformada)
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
    }), [onAddEquipment]);

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

    // Carregar tamanho natural da imagem para cálculo de área scroll
    useEffect(() => {
        if (backgroundImage) {
            const img = new Image();
            img.onload = () => {
                setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.src = backgroundImage;
        } else {
            setImageSize({ width: 0, height: 0 });
        }
    }, [backgroundImage]);

    // Calcular bounding box após rotação (para dar espaço ao scroll)
    const radians = (imageRotation * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const rotatedWidth = Math.abs(imageSize.width * cos) + Math.abs(imageSize.height * sin);
    const rotatedHeight = Math.abs(imageSize.width * sin) + Math.abs(imageSize.height * cos);
    const scaledWidth = rotatedWidth * imageZoom;
    const scaledHeight = rotatedHeight * imageZoom;

    // Estilo do container interno que aplica zoom, rotação e offset (pan)
    const transformStyle = backgroundImage
        ? {
            transform: `translate(${imageOffsetX}px, ${imageOffsetY}px) scale(${imageZoom}) rotate(${imageRotation}deg)`,
            transformOrigin: 'center',
            transition: isPanning ? 'none' : 'transform 0.2s ease-out',
        }
        : {};

    return (
        <div
            ref={drop}
            id="canvas-area"
            className={`relative w-full h-full border-2 border-dashed rounded transition-colors ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'} ${isPanning ? 'cursor-grabbing' : (backgroundImage && imageZoom > 1 ? 'cursor-grab' : '')}`}
            onClick={() => {
                onSelectEquipment(null);
                setContextMenu(null);
            }}
            onMouseDown={handleCanvasMouseDown}
            style={{ overflow: 'scroll' }}
        >
            {/* Wrapper para permitir scroll físico quando em zoom */}
            <div
                className="relative mx-auto"
                style={{
                    width: scaledWidth || '100%',
                    height: scaledHeight || '100%',
                }}
            >
                {/* Camada de fundo com zoom, rotação e pan */}
                <div
                    id="background-layer"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ ...backgroundStyle, ...transformStyle }}
                />

                {/* Camada de equipamentos com mesma transformação */}
                <div
                    id="equipment-layer"
                    className="absolute inset-0 w-full h-full"
                    style={transformStyle}
                >
                    {placedEquipments.map((eq) => (
                        <PlacedEquipment
                            key={eq.instanceId}
                            equipment={eq}
                            isSelected={eq.instanceId === selectedId}
                            onSelect={onSelectEquipment}
                            onMove={onMoveEquipment}
                            onCopy={handleCopyEquipment}
                            onDelete={onDeleteEquipment}
                            onContextMenu={handleEquipmentContextMenu}
                        />
                    ))}
                    {placedEquipments.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm pointer-events-none px-4 text-center">
                            Clique em um item do catálogo para adicionar ao canvas
                        </div>
                    )}
                </div>
            </div>

            {/* Menu de contexto - renderizado fora da camada transformada */}
            {contextMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setContextMenu(null)}
                    />
                    <div
                        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[140px]"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopyEquipment(contextMenu.equipment);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                            <span>📋</span> Copiar
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteEquipment(contextMenu.equipment.instanceId);
                                setContextMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                            <span>🗑️</span> Excluir
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
