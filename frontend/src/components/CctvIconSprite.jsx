import React from 'react';

// Exemplo de uso de sprite SVG hospedado em /icons/cctv/cctv-sprite.svg
// Uso: <CctvIconSprite name="bullet" size={40} color="#111" />
export default function CctvIconSprite({ name = 'bullet', size = 40, color = '#111111', className }) {
  return (
    <svg width={size} height={size} style={{ color }} className={className} aria-hidden="true">
      <use href={`/icons/cctv/cctv-sprite.svg#${name}`} />
    </svg>
  );
}
