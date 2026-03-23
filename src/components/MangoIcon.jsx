export const MangoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="currentColor"
    {...props}
  >
    {/* Mango shape */}
    <path
      d="M50 10c15 0 25 10 25 25 0 20-10 35-25 40-15-5-25-20-25-40 0-15 10-25 25-25z"
      fill="#FFA500"
    />
    {/* Mango highlight */}
    <ellipse cx="40" cy="25" rx="8" ry="12" fill="#FFD700" opacity="0.6" />
    {/* Leaf */}
    <path
      d="M50 8c2 0 3-2 3-4 0 4 5 5 8 3 1 2 1 4-1 5-3 1-8 0-10-4z"
      fill="#228B22"
    />
  </svg>
);
