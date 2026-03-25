export const KubisIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="currentColor"
    {...props}
  >
    {/* Outer cabbage leaves */}
    <circle cx="50" cy="54" r="28" fill="#4CAF50" />
    <ellipse cx="39" cy="50" rx="12" ry="18" fill="#66BB6A" transform="rotate(-20 39 50)" />
    <ellipse cx="61" cy="50" rx="12" ry="18" fill="#66BB6A" transform="rotate(20 61 50)" />

    {/* Inner core */}
    <circle cx="50" cy="56" r="14" fill="#A5D6A7" />

    {/* Leaf veins */}
    <path d="M50 44v24" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 52c-5-3-9-7-12-12" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 52c5-3 9-7 12-12" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 62c-5 2-9 6-12 11" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 62c5 2 9 6 12 11" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);