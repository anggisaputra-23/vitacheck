export const AvocadoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M50 13c17 0 29 13 29 31 0 23-12 41-29 48-17-7-29-25-29-48 0-18 12-31 29-31z" />
    <path d="M50 24c10 0 18 8 18 19 0 15-7 27-18 31-11-4-18-16-18-31 0-11 8-19 18-19z" />
    <circle cx="50" cy="57" r="8" />
    <path d="M50 12c1-4 4-7 8-8" />
  </svg>
);