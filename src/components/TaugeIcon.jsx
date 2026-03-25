export const TaugeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="currentColor"
    {...props}
  >
    {/* Bowl */}
    <ellipse cx="50" cy="74" rx="26" ry="10" fill="#93C5FD" />

    {/* Sprouts stems */}
    <path d="M38 68 C36 58, 36 50, 42 44" stroke="#F8FAFC" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M50 68 C48 56, 48 48, 55 41" stroke="#F8FAFC" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M61 68 C60 57, 60 51, 66 45" stroke="#F8FAFC" strokeWidth="4" fill="none" strokeLinecap="round" />

    {/* Leaves / heads */}
    <ellipse cx="42" cy="43" rx="6" ry="4" fill="#86EFAC" transform="rotate(-20 42 43)" />
    <ellipse cx="55" cy="40" rx="6" ry="4" fill="#86EFAC" transform="rotate(15 55 40)" />
    <ellipse cx="66" cy="44" rx="6" ry="4" fill="#86EFAC" transform="rotate(30 66 44)" />
  </svg>
);