import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import { DropzoneSection } from './styles';

type Props = {
	onDrop: (acceptedFiles: File[]) => void;
	thumbnail: string;
};
function Dropzone({ onDrop, thumbnail }: Props) {
	const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

	return (
		<DropzoneSection {...getRootProps()} style={{ display: 'flex', justifyContent: 'center' }}>
			<input {...getInputProps()} />
			<PlusOutlined style={{ fontSize: '3rem' }} />
			{thumbnail !== '' && (
				<div>
					<img src={`http://localhost:3448/${thumbnail}`} alt="thumbnail" />
				</div>
			)}
		</DropzoneSection>
	);
}

export default Dropzone;
