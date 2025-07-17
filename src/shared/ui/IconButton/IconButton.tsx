import type {ReactNode} from "react";

interface IconButtonProps {
    icon: ReactNode;
    onClick: (e: MouseEvent) => void;
    className?: string;
    danger?: boolean;
}

export const IconButton = ({icon, onClick, className = '', danger = false}: IconButtonProps) => {
    return (
        <span onClick={onClick} className={`${className} ${danger ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-gray-700'} cursor-pointer text-lg inline-flex items-center justify-center`}>
            {icon}
        </span>
    );
}