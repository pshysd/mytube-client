import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { IDislike, ILike, IUser } from '@typings/db';
import { Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FeedbackNumber } from './styles';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type Props = {
	videoId?: string;
	commentId?: string;
};

function Feedbacks({ videoId, commentId }: Props) {
	const { data: userData, mutate: mutateUser } = useSWR<IUser>(`/api/users/`, fetcher);
	const { data: likes, mutate: mutateLikes } = useSWR<ILike[]>(`/api/feedbacks/likes?videoId=${videoId}&commentId=${commentId}`, fetcher);
	const { data: dislikes, mutate: mutateDislikes } = useSWR<IDislike[]>(
		`/api/feedbacks/dislikes?videoId=${videoId}&commentId=${commentId}`,
		fetcher
	);

	const [userLike, setUserLike] = useState(false);
	const [userDislike, setUserDislike] = useState(false);

	useEffect(() => {
		try {
			if (userData) {
				const getUserFeedback = async () => {
					const [like, dislike] = await Promise.all([
						axios.get(`/api/feedbacks/likes/${userData._id}?videoId=${videoId}&commentId=${commentId}`),
						axios.get(`/api/feedbacks/dislikes/${userData._id}?videoId=${videoId}&commentId=${commentId}`),
					]);

					if (like.data) {
						setUserLike(true);
					}

					if (dislike.data) {
						setUserDislike(true);
					}
				};

				getUserFeedback();
			}
		} catch (e) {
			const err = e as Error;
			alert(err.message);
		}
	}, [videoId, commentId]);

	const toggleLike = useCallback(async () => {
		if (userData) {
			await axios.post(`/api/feedbacks/likes`, { videoId, commentId, userId: userData._id });
			mutateLikes();
		} else {
			alert('로그인 후 이용하실 수 있습니다.');
		}
	}, [userLike]);

	const toggleDislike = useCallback(async () => {
		if (userData) {
			await axios.post(`/api/feedbacks/dislikes`, { videoId, commentId, userId: userData?._id });
			mutateDislikes();
		} else {
			alert('로그인 후 이용하실 수 있습니다.');
		}
	}, [userDislike]);

	return (
		<>
			<span key="comment-basic-like">
				<Tooltip title="Like">{userLike ? <LikeFilled onClick={toggleLike} /> : <LikeOutlined onClick={toggleLike} />}</Tooltip>
				<FeedbackNumber>{likes?.length}</FeedbackNumber>
			</span>
			&nbsp;&nbsp;
			<span key="comment-basic-dislike">
				<Tooltip title="Dislike">
					{userDislike ? <DislikeFilled onClick={toggleDislike} /> : <DislikeOutlined onClick={toggleDislike} />}
				</Tooltip>
				<FeedbackNumber>{dislikes?.length}</FeedbackNumber>
			</span>
		</>
	);
}

export default Feedbacks;
