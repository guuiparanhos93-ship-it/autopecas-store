function Logo({ size = 50 }) {
  const height = size;
  const width = size * 1.33;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      width={width}
      height={height}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B5CF6' }}/>
          <stop offset="50%" style={{ stopColor: '#7C3AED' }}/>
          <stop offset="100%" style={{ stopColor: '#6D28D9' }}/>
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#6D28D9" floodOpacity="0.3"/>
        </filter>
      </defs>

      <g transform="translate(200, 100)" filter="url(#shadow)">
        <path d="M-35 -40
                 C-35 -50, -25 -55, -15 -50
                 L0 -35
                 L0 0
                 L-25 0
                 C-35 0, -40 -10, -40 -20
                 L-40 -35
                 C-40 -38, -38 -40, -35 -40Z"
              fill="url(#purpleGradient)"/>

        <path d="M35 -40
                 C35 -50, 25 -55, 15 -50
                 L0 -35
                 L0 0
                 L25 0
                 C35 0, 40 -10, 40 -20
                 L40 -35
                 C40 -38, 38 -40, 35 -40Z"
              fill="url(#purpleGradient)"/>

        <circle cx="0" cy="-25" r="12" fill="#FFFFFF"/>
        <circle cx="0" cy="-25" r="8" fill="url(#purpleGradient)"/>

        <g transform="translate(0, -25)">
          <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
          <rect x="-1.5" y="-10" width="3" height="5" fill="url(#purpleGradient)" rx="1"/>
          <rect x="-1.5" y="5" width="3" height="5" fill="url(#purpleGradient)" rx="1"/>
          <rect x="-10" y="-1.5" width="5" height="3" fill="url(#purpleGradient)" ry="1"/>
          <rect x="5" y="-1.5" width="5" height="3" fill="url(#purpleGradient)" ry="1"/>
        </g>
      </g>

      <text x="200" y="175" fontFamily="Arial Black, Arial, sans-serif" fontSize="72" fontWeight="900" fill="url(#purpleGradient)" textAnchor="middle" letterSpacing="8">
        L&G
      </text>

      <text x="200" y="205" fontFamily="Arial, sans-serif" fontSize="14" fill="#6D28D9" textAnchor="middle" letterSpacing="4" fontWeight="500">
        ACESSÓRIOS & PEÇAS AUTOMOTIVAS
      </text>

      <rect x="120" y="215" width="160" height="2" fill="url(#purpleGradient)" rx="1"/>
    </svg>
  );
}

export default Logo;
