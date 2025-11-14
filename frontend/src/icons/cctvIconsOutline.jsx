import React from 'react';

const SvgBase = ({ children, strokeWidth = 2, ...props }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    {children}
  </svg>
);

const BulletCam = (props) => (
  <SvgBase {...props}>
    <rect x="4" y="18" width="22" height="12" rx="3" />
    <rect x="24" y="19" width="16" height="10" rx="2" />
    <circle cx="34" cy="24" r="4" fill="currentColor" stroke="none" />
    <rect x="8" y="30" width="10" height="4" rx="2" />
  </SvgBase>
);

const DomeCam = (props) => (
  <SvgBase {...props}>
    <path d="M6 24a18 18 0 0 1 36 0" />
    <path d="M10 26h28c0 6-6 10-14 10S10 32 10 26Z" />
    <circle cx="24" cy="30" r="4" fill="currentColor" stroke="none" />
  </SvgBase>
);

const TurretCam = (props) => (
  <SvgBase {...props}>
    <circle cx="24" cy="22" r="10" />
    <circle cx="24" cy="22" r="5" fill="currentColor" stroke="none" />
    <rect x="14" y="30" width="20" height="5" rx="2.5" />
  </SvgBase>
);

const PTZCam = (props) => (
  <SvgBase {...props}>
    <path d="M8 22c0-6 8-10 16-10s16 4 16 10" />
    <rect x="14" y="22" width="20" height="10" rx="5" />
    <circle cx="24" cy="27" r="4" fill="currentColor" stroke="none" />
    <rect x="18" y="33" width="12" height="4" rx="2" />
  </SvgBase>
);

const BoxCam = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="16" width="26" height="16" rx="3" />
    <rect x="30" y="18" width="12" height="12" rx="2" />
    <circle cx="36" cy="24" r="3.5" fill="currentColor" stroke="none" />
  </SvgBase>
);

const CubeCam = (props) => (
  <SvgBase {...props}>
    <rect x="12" y="12" width="24" height="24" rx="4" />
    <circle cx="24" cy="24" r="6" fill="currentColor" stroke="none" />
    <rect x="20" y="36" width="8" height="4" rx="2" />
  </SvgBase>
);

const FisheyeCam = (props) => (
  <SvgBase {...props}>
    <circle cx="24" cy="24" r="14" />
    <circle cx="24" cy="24" r="8" />
    <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
  </SvgBase>
);

const WifiCam = (props) => (
  <SvgBase {...props}>
    <rect x="10" y="18" width="20" height="12" rx="3" />
    <circle cx="20" cy="24" r="3.5" fill="currentColor" stroke="none" />
    <path d="M30 22c4-4 8-4 12 0" />
    <path d="M30 18c6-6 12-6 18 0" />
  </SvgBase>
);

const NvrDvr = (props) => (
  <SvgBase {...props}>
    <rect x="8" y="26" width="32" height="10" rx="2" />
    <rect x="8" y="18" width="32" height="8" rx="2" />
    <circle cx="34" cy="31" r="2.5" fill="currentColor" stroke="none" />
  </SvgBase>
);

const SwitchPoE = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="22" width="36" height="12" rx="3" />
    {[...Array(8)].map((_, i) => (
      <rect key={i} x={9 + i * 4} y="26" width="3" height="4" rx="0.5" />
    ))}
  </SvgBase>
);

const Router = (props) => (
  <SvgBase {...props}>
    <rect x="10" y="28" width="28" height="8" rx="2" />
    <rect x="14" y="18" width="2" height="10" />
    <rect x="32" y="18" width="2" height="10" />
    <path d="M15 18c3-4 7-4 10 0" />
    <path d="M33 18c3-4 7-4 10 0" />
  </SvgBase>
);

const Monitor = (props) => (
  <SvgBase {...props}>
    <rect x="8" y="12" width="32" height="20" rx="2" />
    <rect x="18" y="32" width="12" height="4" rx="2" />
    <rect x="14" y="36" width="20" height="4" rx="2" />
  </SvgBase>
);

// Variações
const BulletBracket = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="20" width="22" height="8" rx="3" />
    <rect x="26" y="21" width="14" height="6" rx="2" />
    <circle cx="34" cy="24" r="3" fill="currentColor" stroke="none" />
    <rect x="10" y="28" width="4" height="8" />
    <rect x="9" y="34" width="6" height="3" rx="1.5" />
  </SvgBase>
);

const SpeedDomeHanging = (props) => (
  <SvgBase {...props}>
    <rect x="20" y="8" width="8" height="6" rx="2" />
    <rect x="12" y="12" width="24" height="3" rx="1.5" />
    <path d="M10 24a14 12 0 0 1 28 0" />
    <path d="M14 28h20c0 4-4 8-10 8s-10-4-10-8Z" />
  </SvgBase>
);

const MiniDome = (props) => (
  <SvgBase {...props}>
    <path d="M12 26a12 12 0 0 1 24 0" />
    <path d="M16 30h16c0 3.5-3.5 6-8 6s-8-2.5-8-6Z" />
  </SvgBase>
);

const CeilingAP = (props) => (
  <SvgBase {...props}>
    <circle cx="24" cy="24" r="12" />
    <circle cx="24" cy="24" r="6" />
  </SvgBase>
);

const LprCam = (props) => (
  <SvgBase {...props}>
    <rect x="6" y="18" width="24" height="12" rx="3" />
    <rect x="28" y="19" width="14" height="10" rx="2" />
    <rect x="10" y="31" width="8" height="3" rx="1.5" />
    <rect x="30" y="22" width="10" height="4" rx="1" />
  </SvgBase>
);

export const CCTV_ICONS_OUTLINE = [
  { id: 'bullet', label: 'Bullet', Component: BulletCam },
  { id: 'bullet-bracket', label: 'Bullet c/ Suporte', Component: BulletBracket },
  { id: 'dome', label: 'Dome', Component: DomeCam },
  { id: 'mini-dome', label: 'Mini Dome', Component: MiniDome },
  { id: 'turret', label: 'Turret', Component: TurretCam },
  { id: 'ptz', label: 'Speed Dome', Component: PTZCam },
  { id: 'fisheye', label: 'Fisheye', Component: FisheyeCam },
  { id: 'wifi-cam', label: 'Wi‑Fi Cam', Component: WifiCam },
  { id: 'lpr', label: 'LPR', Component: LprCam },
  { id: 'box', label: 'Box', Component: BoxCam },
  { id: 'nvr', label: 'NVR/DVR', Component: NvrDvr },
  { id: 'switch', label: 'Switch PoE', Component: SwitchPoE },
  { id: 'router', label: 'Roteador', Component: Router },
  { id: 'monitor', label: 'Monitor', Component: Monitor },
  { id: 'ceiling-ap', label: 'AP Teto', Component: CeilingAP },
];

export const getCctvOutlineIconById = (id) => CCTV_ICONS_OUTLINE.find((i) => i.id === id);
