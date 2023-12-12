import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IComment, IUser, IVideo } from '@typings/db';
import { Avatar, List, Row } from 'antd';
import Feedbacks from '@components/Feedbacks';
import Subscriber from '@components/Subscriber';
import Comments from '@components/Comments';
import SideVideo from '@components/SideVideo';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Col } from './styles';

function DetailVideo() {
	const { videoId } = useParams();
	const { data: userData } = useSWR<IUser>('/api/users', fetcher);
	const { data: videoData } = useSWR<IVideo>(`/api/videos/${videoId}`, fetcher);
	const { data: commentData } = useSWR<IComment>(`/api/comments/${videoId}`, fetcher);

	if (videoId && videoData) {
		return (
			<Row>
				<Col lg={18} xs={24}>
					<div>
						<video src={`/${videoData?.filePath}`} controls />

						<List.Item
							actions={[<Feedbacks videoId={videoData?._id} />, <Subscriber userTo={videoData.writer._id} userFrom={userData?._id} />]}
						>
							<List.Item.Meta
								avatar={<Avatar src={videoData?.writer.image} />}
								title={<Link to="https://ant.design">{videoData?.title}</Link>}
								description={videoData?.description}
							/>
						</List.Item>

						<Comments comment={commentData} videoId={videoId} />
					</div>
				</Col>
				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>
			</Row>
		);
	} else {
		return <div>잘못된 접근입니다.</div>;
	}
}

export default DetailVideo;
