import React, { FormEvent, MouseEvent, useState } from 'react';
import useInput from '@hooks/useInput';
import { IComment, IUser } from '@typings/db';
import axios from 'axios';
import Comment from '@components/Comments';
import Reply from '@components/Reply';
import { Button, TextArea } from './styles';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Form } from 'antd';

type Props = {
	videoId: string;
	comment?: IComment;
};

function Comments({ videoId }: Props) {
	const { data: user } = useSWR('/api/users', fetcher);
	const { data: comments, mutate: mutateComments } = useSWR<IComment[]>(`/api/comments/${videoId}`, fetcher);

	const [comment, onChangeComment, setComment] = useInput('');
	const [commentError, setCommentError] = useState(false);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result = await axios.post('/api/comments', {
				content: comment,
				writer: user,
				videoId: videoId,
			});

			if (result) {
				setComment('');
				mutateComments();
				mutateComments();
			}
		} catch (e) {
			const err = e as Error;
			setCommentError(true);
			alert(err.message);
		}
	};

	return (
		<div>
			<br />
			<p>댓글</p>
			<hr />
			{comments &&
				comments.map(
					(comment) =>
						!comment.responseTo && (
							<>
								<Comment comment={comment} videoId={videoId} />
								<Reply commentList={comments} videoId={videoId} parentComment={comment} />
							</>
						)
				)}
			<Form>
				<Form>
					<TextArea onChange={onChangeComment} value={comment} placeholder="댓글을 입력해주세요." />
					<br />
					<Button onSubmit={onSubmit}>등록하기</Button>
				</Form>
				<Button onSubmit={onSubmit}>등록하기</Button>
			</Form>
		</div>
	);
}

export default Comments;
