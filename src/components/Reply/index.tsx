import { IComment } from '@typings/db';
import React, { useEffect, useState } from 'react';
import Comment from '@components/Comment';

type Props = {
	commentList: IComment[];
	videoId: string;
	parentComment: IComment;
};

function Reply({ commentList, videoId, parentComment }: Props) {
	const [childCommentNumber, setChildCommentNumber] = useState(0);
	const [showReplyComments, setShowReplyComments] = useState(false);

	useEffect(() => {
		let commentNumber = 0;
		commentList.map((comment) => {
			if (comment.responseTo === parentComment.writer) {
				commentNumber++;
			}
		});
		setChildCommentNumber(commentNumber);
	}, [commentList, parentComment]);

	let renderReplyComment = (parentCommentId: string) =>
		commentList.map((comment, index) => (
			<>
				{comment.responseTo === parentComment.writer && (
					<div style={{ width: '80%', marginLeft: '40px' }}>
						<Comment comment={comment} videoId={videoId} />
						<Reply commentList={commentList} videoId={videoId} parentComment={parentComment} />
					</div>
				)}
			</>
		));

	const ToggleReply = () => {
		setShowReplyComments(!showReplyComments);
	};

	return (
		<div>
			{childCommentNumber > 0 && (
				<p style={{ fontSize: '14px', margin: 0, color: 'grey' }} onClick={ToggleReply}>
					{childCommentNumber}개의 댓글 더보기
				</p>
			)}
		</div>
	);
}

export default Reply;
