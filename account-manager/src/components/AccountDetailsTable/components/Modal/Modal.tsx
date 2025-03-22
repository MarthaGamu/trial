import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string; // Optional class for customizing styles
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	className
}) => {
	if (!isOpen) return null; // Don't render the modal if it's not open

	return (
		<div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm  z-50'>
			<div
				className={`bg-[#151515] rounded-lg p-6 shadow-lgd w-full max-w-md ${className}`}
			>
				<div className='flex justify-end'>
					<button
						className='px-4 py-2 text-gray-300 rounded hover:bg-gray-600 inline-flex justify-center items-center cursor-pointer'
						onClick={onClose}
					>
						<FaTimes className='w-4 h-4 mr-2' />
						Close
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
