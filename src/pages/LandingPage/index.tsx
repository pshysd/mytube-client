import React from 'react';
import RenderCard from '@components/RenderCard';
import { Typography, Row } from 'antd';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IVideo } from '@typings/db';
import { Wrapper } from './styles';
const { Title } = Typography;

function LandingPage() {
	console.log('Landing Page Rendered');

	const { data: videos } = useSWR('/api/videos', fetcher);

	return (
		<Wrapper>
			<Title level={2}>추천 동영상</Title>
			<hr />
			<Row gutter={16}>{videos && videos.map((video: IVideo) => <RenderCard video={video} key={video._id} />)}</Row>
		</Wrapper>
	);
}

export default LandingPage;
