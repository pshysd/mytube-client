import React, { FormEvent, useCallback, useState } from 'react';
import { IComment, IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import axios from 'axios';
import Feedbacks from '@components/Feedbacks';
import { Avatar, CommentArea, Form, TextArea, Button } from './styles';

type Props = {
	videoId: string;
	comment: IComment;
};

function Comment({ videoId, comment }: Props) {
	const { data: user } = useSWR<IUser>('/api/users', fetcher);
	const [commentValue, onChangeCommentValue, setCommentValue] = useInput('');
	const [showReply, setShowReply] = useState(false);

	const onClickReply = useCallback(() => {
		setShowReply((prev) => !prev);
	}, [showReply]);

	const onSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const result = await axios.post(
				'/api/comments',
				{
					writer: user?._id,
					videoId,
					responseTo: comment?._id,
					content: commentValue,
				},
				{
					withCredentials: true,
				}
			);

			if (result) {
				setCommentValue('');
				setShowReply((prev) => !prev);
			}
		},
		[commentValue]
	);

	return (
		<div>
			<CommentArea
				author={comment.writer.name}
				avatar={<Avatar src={comment.writer.image} alt="image" />}
				content={<p>{comment.content}</p>}
			>
				<Feedbacks />
				<span onClick={onClickReply} key="comment-basic-reply-to">
					답글
				</span>
			</CommentArea>

			{showReply && (
				<Form onSubmit={onSubmit}>
					<TextArea onChange={onChangeCommentValue} value={commentValue} placeholder="댓글을 입력해주세요." />
					<br />
					<Button>등록하기</Button>
				</Form>
			)}
		</div>
	);
}

export default Comment;
