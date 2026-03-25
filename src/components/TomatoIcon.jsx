export const TomatoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="50" cy="56" r="30" />
    <path d="M50 26v-8" />
    <path d="M50 26c-4-5-10-6-14-4" />
    <path d="M50 26c4-5 10-6 14-4" />
    <path d="M50 26c-1 4-5 7-10 8" />
    <path d="M50 26c1 4 5 7 10 8" />
    <path d="M40 44c3-2 7-3 10-3" />
  </svg>
);
