export const TomatoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="currentColor"
    {...props}
  >
    {/* Tomato body */}
    <circle cx="50" cy="55" r="35" fill="#E63946" />
    {/* Tomato indent top */}
    <circle cx="50" cy="25" r="8" fill="#E63946" />
    {/* Tomato highlight */}
    <ellipse cx="35" cy="40" rx="15" ry="20" fill="#FF6B6B" opacity="0.4" />
    {/* Stem */}
    <rect x="46" y="15" width="8" height="12" fill="#228B22" />
    {/* Leaves */}
    <path
      d="M45 18c-3 2-6 1-8-1"
      stroke="#228B22"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M55 18c3 2 6 1 8-1"
      stroke="#228B22"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);
