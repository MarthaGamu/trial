import React from 'react';

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
		<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
			<div
				className={`bg-white rounded-lg p-6 shadow-lg w-full max-w-md ${className}`}
			>
				<div className='flex justify-end'>
					<button
						className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
						onClick={onClose}
					>
						Close
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
