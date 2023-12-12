import useInput from '@hooks/useInput';
import useSelect from '@hooks/useSelect';
import { ICategory, IPrivacy, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Button, Form, Input, TextArea, Title, Wrapper } from './styles';
import Dropzone from '@components/Dropzone';

function UploadVideo() {
	const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
		dedupingInterval: 30000,
	});
	const { data: categoryData } = useSWR<ICategory[]>('/api/categories', fetcher, {
		revalidateOnFocus: false,
	});
	const { data: privacyData } = useSWR<IPrivacy[]>('/api/privacy', fetcher, {
		revalidateOnFocus: false,
	});

	const [title, onChangeTitle] = useInput('');
	const [description, onChangeDescription] = useInput('');
	const [privacy, onChangePrivacy] = useSelect(privacyData?.[0].label);
	const [category, onChangeCategory] = useSelect(categoryData?.[0].label);
	const [filePath, setFilePath] = useState('');
	const [duration, setDuration] = useState('');
	const [thumbnail, setThumbnail] = useState('');

	const navigate = useNavigate();

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const formData = new FormData();
		formData.append('file', acceptedFiles[0]);

		const result = await axios.post('/api/videos/file', formData, {
			withCredentials: true,
			headers: { 'content-type': 'multipart/form-data' },
		});
		if (result) {
			const { filePath, fileName } = result.data;
			setFilePath(filePath);

			const uploadThumbnail = await axios.post('/api/videos/thumbnail', {
				filePath,
				fileName,
			});

			if (uploadThumbnail) {
				const { fileDuration, thumbnailFilePath } = uploadThumbnail.data;
				setDuration(fileDuration);
				setThumbnail(thumbnailFilePath);
			}
		}
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		if (title === '' || description === '' || category === '' || filePath === '' || duration === '' || thumbnail === '')
			return alert('모든 항목을 입력해주셔야 합니다.');

		try {
			const result = await axios.post('/api/videos', {
				writer: userData?._id,
				title,
				description,
				privacy,
				filePath,
				category,
				duration,
				thumbnail,
			});
			if (result) {
				alert('비디오를 성공적으로 업로드되었습니다.');
				navigate('/');
			}
		} catch (e) {
			const err = e as Error;
			alert(err.response.data);
		}
	};

	return (
		<Wrapper>
			<Title>파일 업로드</Title>

			<Form onFinish={onSubmit}>
				<Dropzone onDrop={onDrop} thumbnail={thumbnail} />

				<br />
				<br />

				<label>Title</label>
				<Input onChange={onChangeTitle} value={title} />
				<br />
				<br />
				<label>Description</label>
				<TextArea onChange={onChangeDescription} value={description} />
				<br />
				<br />

				<select onChange={onChangePrivacy}>
					{privacyData?.map((item, index) => (
						<option key={index} value={item.label}>
							{item.label}
						</option>
					))}
				</select>
				<br />
				<br />

				<select onChange={onChangeCategory}>
					{categoryData?.map((item, index) => (
						<option key={index} value={item.label}>
							{item.label}
						</option>
					))}
				</select>
				<br />
				<br />

				<Button htmlType="submit" type="primary" size="large" onSubmit={onSubmit}>
					등록하기
				</Button>
			</Form>
		</Wrapper>
	);
}

export default UploadVideo;
