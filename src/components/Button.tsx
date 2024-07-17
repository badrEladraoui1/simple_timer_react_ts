import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="border-2 border-white p-3 rounded-md hover:bg-white hover:text-black font-mono"
    >
      {children}
    </button>
  );
};

export default Button;
