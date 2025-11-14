import React from 'react';

// Biblioteca minimalista de ícones SVG focados em CFTV
// Cada ícone é um componente React que aceita props (width, height, className, style)

const SvgBase = ({ children, ...props }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    {children}
  </svg>
);

const BulletCam = (props) => (
  <SvgBase {...props}>
    <g>
      <rect x="4" y="18" width="22" height="12" rx="3" />
      <rect x="24" y="19" width="16" height="10" rx="2" />
      <circle cx="34" cy="24" r="4" fill="currentColor" />
      <rect x="8" y="30" width="10" height="4" rx="2" />
    </g>
  </SvgBase>
);

const DomeCam = (props) => (
  <SvgBase {...props}>
    <path d="M6 22a18 18 0 0 1 36 0v2H6v-2z" />
    <path d="M10 26h28a10 10 0 0 1-28 0z" />
    <circle cx="24" cy="30" r="4" fill="currentColor" />
  </SvgBase>
);

const TurretCam = (props) => (
  <SvgBase {...props}>
    <circle cx="24" cy="22" r="10" />
    <circle cx="24" cy="22" r="5" fill="currentColor" />
    <rect x="14" y="30" width="20" height="5" rx="2.5" />
  </SvgBase>
);

const PTZCam = (props) => (
  <SvgBase {...props}>
    <path d="M8 20a16 10 0 0 1 32 0v2H8v-2z" />
    <rect x="14" y="22" width="20" height="10" rx="5" />
    <circle cx="24" cy="27" r="4" fill="currentColor" />
    <rect x="18" y="33" width="12" height="4" rx="2" />
  </SvgBase>
);

const BoxCam = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="16" width="26" height="16" rx="3" />
    <rect x="30" y="18" width="12" height="12" rx="2" />
    <circle cx="36" cy="24" r="3.5" fill="currentColor" />
  </SvgBase>
);

const CubeCam = (props) => (
  <SvgBase {...props}>
    <rect x="12" y="12" width="24" height="24" rx="4" />
    <circle cx="24" cy="24" r="6" fill="currentColor" />
    <rect x="20" y="36" width="8" height="4" rx="2" />
  </SvgBase>
);

const FisheyeCam = (props) => (
  <SvgBase {...props}>
    <circle cx="24" cy="24" r="14" />
    <circle cx="24" cy="24" r="8" fill="currentColor" />
    <circle cx="24" cy="24" r="2" fill="#ffffff" />
  </SvgBase>
);

const WifiCam = (props) => (
  <SvgBase {...props}>
    <rect x="10" y="18" width="20" height="12" rx="3" />
    <circle cx="20" cy="24" r="3.5" fill="currentColor" />
    <path d="M30 22c4-4 8-4 12 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30 18c6-6 12-6 18 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </SvgBase>
);

const NvrDvr = (props) => (
  <SvgBase {...props}>
    <rect x="8" y="26" width="32" height="10" rx="2" />
    <rect x="8" y="18" width="32" height="8" rx="2" />
    <circle cx="34" cy="31" r="2.5" fill="currentColor" />
  </SvgBase>
);

const SwitchPoE = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="22" width="36" height="12" rx="3" />
    {[...Array(8)].map((_, i) => (
      <rect key={i} x={9 + i * 4} y="26" width="3" height="4" rx="0.5" fill="currentColor" />
    ))}
  </SvgBase>
);

const Router = (props) => (
  <SvgBase {...props}>
    <rect x="10" y="28" width="28" height="8" rx="2" />
    <rect x="14" y="18" width="2" height="10" />
    <rect x="32" y="18" width="2" height="10" />
    <path d="M15 18c3-4 7-4 10 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M33 18c3-4 7-4 10 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </SvgBase>
);

const Monitor = (props) => (
  <SvgBase {...props}>
    <rect x="8" y="12" width="32" height="20" rx="2" />
    <rect x="18" y="32" width="12" height="4" rx="2" />
    <rect x="14" y="36" width="20" height="4" rx="2" />
  </SvgBase>
);

export const CCTV_ICONS = [
  { id: 'bullet', label: 'Bullet', Component: BulletCam },
  { id: 'dome', label: 'Dome', Component: DomeCam },
  { id: 'turret', label: 'Turret', Component: TurretCam },
  { id: 'ptz', label: 'PTZ', Component: PTZCam },
  { id: 'box', label: 'Box', Component: BoxCam },
  { id: 'cube', label: 'Cube', Component: CubeCam },
  { id: 'fisheye', label: 'Fisheye', Component: FisheyeCam },
  { id: 'wifi-cam', label: 'Wi‑Fi Cam', Component: WifiCam },
  { id: 'nvr', label: 'NVR/DVR', Component: NvrDvr },
  { id: 'switch', label: 'Switch PoE', Component: SwitchPoE },
  { id: 'router', label: 'Roteador', Component: Router },
  { id: 'monitor', label: 'Monitor', Component: Monitor },
];

// Variações adicionais
const BulletBracket = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="20" width="22" height="8" rx="3" />
    <rect x="26" y="21" width="14" height="6" rx="2" />
    <circle cx="34" cy="24" r="3" fill="currentColor" />
    <rect x="10" y="28" width="4" height="8" />
    <rect x="9" y="34" width="6" height="3" rx="1.5" />
  </SvgBase>
);

const SpeedDomeHanging = (props) => (
  <SvgBase {...props}>
    <rect x="20" y="8" width="8" height="6" rx="2" />
    <rect x="12" y="12" width="24" height="3" rx="1.5" />
    <path d="M10 24a14 12 0 0 1 28 0v2H10v-2z" />
    <path d="M14 28h20a8 8 0 0 1-20 0z" />
  </SvgBase>
);

const MiniDome = (props) => (
  <SvgBase {...props}>
    <path d="M12 26a12 12 0 0 1 24 0v2H12v-2z" />
    <path d="M16 30h16a6 6 0 0 1-16 0z" />
  </SvgBase>
);

const CeilingAP = (props) => (
  <SvgBase {...props}>
    <circle cx="24" cy="24" r="12" />
    <circle cx="24" cy="24" r="6" fill="#ffffff" />
  </SvgBase>
);

const LprCam = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="18" width="24" height="12" rx="3" />
    <rect x="28" y="19" width="14" height="10" rx="2" />
    <rect x="10" y="31" width="8" height="3" rx="1.5" />
    <rect x="30" y="22" width="10" height="4" rx="1" fill="#ffffff" />
  </SvgBase>
);

// Adicionar variações à lista
CCTV_ICONS.push(
  { id: 'bullet-bracket', label: 'Bullet c/ Suporte', Component: BulletBracket },
  { id: 'speed-dome', label: 'Speed Dome', Component: SpeedDomeHanging },
  { id: 'mini-dome', label: 'Mini Dome', Component: MiniDome },
  { id: 'ceiling-ap', label: 'AP Teto', Component: CeilingAP },
  { id: 'lpr', label: 'LPR', Component: LprCam },
);

export const getCctvIconById = (id) => CCTV_ICONS.find((i) => i.id === id);
