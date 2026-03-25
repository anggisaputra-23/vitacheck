export const WatermelonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="currentColor"
    {...props}
  >
    {/* Rind */}
    <path d="M15 62a35 35 0 0 1 70 0" fill="#2E7D32" />
    {/* White layer */}
    <path d="M21 62a29 29 0 0 1 58 0" fill="#F8FAFC" />
    {/* Flesh */}
    <path d="M25 62a25 25 0 0 1 50 0" fill="#EF4444" />

    {/* Seeds */}
    <ellipse cx="36" cy="54" rx="1.6" ry="2.4" fill="#1F2937" />
    <ellipse cx="44" cy="49" rx="1.4" ry="2.2" fill="#1F2937" />
    <ellipse cx="50" cy="56" rx="1.5" ry="2.3" fill="#1F2937" />
    <ellipse cx="58" cy="50" rx="1.4" ry="2.2" fill="#1F2937" />
    <ellipse cx="64" cy="55" rx="1.6" ry="2.4" fill="#1F2937" />
  </svg>
);