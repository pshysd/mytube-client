import React, { MouseEventHandler, useCallback } from 'react';
import { CloseModalButton, CreateModal } from './styles';

type Props = {
	show: boolean;
	onCloseModal: () => void;
	children: React.ReactNode;
};

function Modal({ show, onCloseModal, children }: Props) {
	const stopPropagation: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
		e.stopPropagation();
	}, []);

	if (!show) return null;

	return (
		<CreateModal onClick={onCloseModal}>
			<div onClick={stopPropagation}>
				<CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
				{children}
			</div>
		</CreateModal>
	);
}

export default Modal;
