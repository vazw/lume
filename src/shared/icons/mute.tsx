import { SVGProps } from 'react';

export default function MuteIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 5.93934V3.75C17 3.47592 16.8505 3.22366 16.6101 3.09208C16.3696 2.9605 16.0766 2.97055 15.8457 3.1183L9.78055 7H5.75C5.33579 7 5 7.33579 5 7.75V16.25C5 16.6642 5.33579 17 5.75 17H5.93934L3.21967 19.7197C2.92678 20.0126 2.92678 20.4874 3.21967 20.7803C3.51256 21.0732 3.98744 21.0732 4.28033 20.7803L20.7803 4.28033C21.0732 3.98744 21.0732 3.51256 20.7803 3.21967C20.4874 2.92678 20.0126 2.92678 19.7197 3.21967L17 5.93934ZM7.43934 15.5H6.5V8.5H10C10.1433 8.5 10.2836 8.45895 10.4043 8.3817L15.5 5.12045V7.43934L7.43934 15.5Z"
        fill="currentColor"
      />
      <path
        d="M15.5 18.8796L11.1102 16.0701L10.0243 17.156L15.8457 20.8817C16.0766 21.0294 16.3696 21.0395 16.6101 20.9079C16.8505 20.7763 17 20.5241 17 20.25V10.1803L15.5 11.6803V18.8796Z"
        fill="currentColor"
      />
    </svg>
  );
}
