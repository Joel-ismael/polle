import React from 'react';

interface PieceProps {
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
  color: 'white' | 'black';
  size?: number;
}

export const ChessPieceIcon: React.FC<PieceProps> = ({ type, color, size = 44 }) => {
  const isWhite = color === 'white';
  
  // Custom design colors
  const fillColor = isWhite ? 'url(#whiteGradient)' : 'url(#blackGradient)';
  const strokeColor = isWhite ? '#475569' : '#0f172a';
  const shadowColor = isWhite ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.35)';

  const renderPiecePath = () => {
    switch (type) {
      case 'p': // Pawn
        return (
          <g transform="translate(4, 4) scale(0.92)" strokeWidth="1.5" strokeLinecap="round">
            {/* Base shadow */}
            <path d="M 12,36 C 24,36 28,36 36,36 Q 36,39 24,40 Q 12,39 12,36 Z" fill="rgba(0,0,0,0.15)" stroke="none" />
            {/* Body */}
            <path d="M 16,36 C 16,32 19,25 21,17 C 18,17 15,15 15,12 C 15,9 18,8 24,8 C 30,8 33,9 33,12 C 33,15 30,17 27,17 C 29,25 32,32 32,36" fill={fillColor} stroke={strokeColor} />
            {/* Top ball */}
            <circle cx="24" cy="11" r="5.5" fill={fillColor} stroke={strokeColor} />
            {/* Bottom collar */}
            <path d="M 13,36 L 35,36" stroke={strokeColor} strokeWidth="2" />
            <rect x="14" y="37" width="20" height="2" rx="1" fill={fillColor} stroke={strokeColor} />
          </g>
        );

      case 'r': // Rook
        return (
          <g transform="translate(4, 4) scale(0.92)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
            {/* Body castle */}
            <path d="M 12,36 L 36,36 L 34,16 L 14,16 Z" fill={fillColor} stroke={strokeColor} />
            {/* Battlements */}
            <path d="M 14,16 L 14,10 L 18,10 L 18,13 L 22,13 L 22,10 L 26,10 L 26,13 L 30,13 L 30,10 L 34,10 L 34,16" fill={fillColor} stroke={strokeColor} />
            {/* Bottom rim */}
            <rect x="11" y="36" width="26" height="3" rx="1.5" fill={fillColor} stroke={strokeColor} />
          </g>
        );

      case 'n': // Knight
        return (
          <g transform="translate(4,4) scale(0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Galloping Horse Mane & Face */}
            <path d="M 12,36 C 12,36 11,28 15,22 C 17,19 14,14 18,10 C 22,6 27,5 29,8 C 30,9 32,11 34,10 C 36,9 37,11 36,13 C 34,17 31,18 29,19 C 27,20 28,24 33,26 C 34,26.5 35,28 32,31 C 29,34 26,35 12,36 Z" fill={fillColor} stroke={strokeColor} />
            <circle cx="27" cy="12" r="1.5" fill={isWhite ? '#334155' : '#f8fafc'} stroke="none" />
            {/* Reign details */}
            <path d="M 19,16 C 22,18 25,18 28,15" stroke={strokeColor} fill="none" strokeWidth="1.2" />
          </g>
        );

      case 'b': // Bishop
        return (
          <g transform="translate(4, 4) scale(0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Base support */}
            <path d="M 16,36 C 16,36 19,30 24,30 C 29,30 32,36 32,36" fill={fillColor} stroke={strokeColor} />
            {/* Oval Head */}
            <path d="M 24,9 C 19,13 18,22 24,29 C 30,22 29,13 24,9 Z" fill={fillColor} stroke={strokeColor} />
            {/* Mitre cross cut */}
            <path d="M 21,14 L 27,18 M 27,14 L 21,18" stroke={strokeColor} strokeWidth="1.5" />
            {/* Top sphere */}
            <circle cx="24" cy="7.5" r="2.5" fill={fillColor} stroke={strokeColor} />
            {/* Bottom Ring */}
            <rect x="13" y="36" width="22" height="3" rx="1.5" fill={fillColor} stroke={strokeColor} />
          </g>
        );

      case 'q': // Queen
        return (
          <g transform="translate(1, 1) scale(0.96)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Beautiful Crown Base */}
            <path d="M 12,38 L 36,38 M 13,38 L 15,22 L 20,31 L 24,14 L 28,31 L 33,22 L 35,38 Z" fill={fillColor} stroke={strokeColor} />
            {/* Jewels on crown points */}
            <circle cx="15" cy="21" r="2.2" fill={fillColor} stroke={strokeColor} />
            <circle cx="20" cy="30" r="1.8" fill={fillColor} stroke={strokeColor} />
            <circle cx="24" cy="13" r="2.5" fill={fillColor} stroke={strokeColor} />
            <circle cx="28" cy="30" r="1.8" fill={fillColor} stroke={strokeColor} />
            <circle cx="33" cy="21" r="2.2" fill={fillColor} stroke={strokeColor} />
            {/* Crown bottom pad */}
            <rect x="10" y="38" width="28" height="3" rx="1.5" fill={fillColor} stroke={strokeColor} />
          </g>
        );

      case 'k': // King
        return (
          <g transform="translate(1, 1) scale(0.96)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Crown Frame */}
            <path d="M 13,38 L 35,38 L 33,20 C 33,20 28,21 24,17 C 20,21 15,20 15,20 Z" fill={fillColor} stroke={strokeColor} />
            {/* Internal Arch lines */}
            <path d="M 24,17 L 24,38 M 19,25 C 22,23 26,23 29,25" stroke={strokeColor} fill="none" strokeWidth="1.2" />
            {/* Cross on top */}
            <path d="M 24,13 L 24,7 M 21,10 L 27,10" stroke={strokeColor} strokeWidth="1.5" />
            <rect x="10" y="38" width="28" height="3" rx="1.5" fill={fillColor} stroke={strokeColor} />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className="select-none pointer-events-none drop-shadow-md"
      referrerPolicy="no-referrer"
    >
      <defs>
        {/* Dynamic Premium Gradients */}
        <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fafaf9" />
          <stop offset="60%" stopColor="#f5f5f4" />
          <stop offset="100%" stopColor="#e7e5e4" />
        </linearGradient>
        <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {renderPiecePath()}
    </svg>
  );
};
