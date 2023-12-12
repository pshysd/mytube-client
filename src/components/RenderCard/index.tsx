import { IVideo } from '@typings/db';
import React from 'react';
import { Duration } from './styles';
import { Avatar, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';

type Props = {
	video: IVideo;
};

function RenderCard({ video }: Props) {
	console.log('RenderCard Rendered');

	const duration = video.duration;

	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration - minutes * 60);

	return (
		<Col lg={6} md={8} xs={24} key={video._id}>
			<div style={{ position: 'relative' }}>
				<a href={`/video/${video._id}`}>
					<img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:3448/${video.thumbnail}`} />
					<Duration>
						<span>
							{minutes} : {seconds}
						</span>
					</Duration>
				</a>
			</div>
			<br />
			<Meta avatar={<Avatar src={video.writer.image} />} title={video.title} />
			<span>{video.writer.name}</span>
			<br />
			<span style={{ marginLeft: '3rem' }}>{video.views}</span>- <span>{moment(video.createdAt).format('MMM Do YY')}</span>
		</Col>
	);
}

export default RenderCard;
