import { IUser, IVideo } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Avatar, Col, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Duration } from './styles';
const { Title } = Typography;

function Subscription() {
	const { data: user } = useSWR<IUser>(`/api/users`, fetcher);
	const { data: videos } = useSWR<IVideo[]>(`/api/videos/subs/${user?._id}`, fetcher);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			alert('로그인한 유저만 이용 가능한 서비스입니다.');
			return navigate('/login');
		}
	}, [user, navigate]);

	const renderCard = videos?.map((video) => {
		let minutes = Math.floor(video.duration / 60);
		let seconds = Math.floor(video.duration / 60);

		return (
			<Col lg={6} md={8} xs={24}>
				<div>
					<Link to={`/videos${video._id}`}>
						<img style={{ width: '100%' }} src={`http://localhost:3448/${video.thumbnail}`} alt="thumbnail" />
						<Duration>
							<span>
								{minutes} : {seconds}
							</span>
						</Duration>
					</Link>
				</div>
				<br />
				<Meta avatar={<Avatar src={video.writer.image} />} />
				<span>{video.writer.name}</span>
				<br />
				<span style={{ marginLeft: '3rem' }}>{video.views}</span> - <span>{moment(video.createdAt).format('MMM Do YY')} </span>
			</Col>
		);
	});

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<Title>구독 목록</Title>
			<hr />

			<Row gutter={16}>{renderCard}</Row>
		</div>
	);
}

export default Subscription;
