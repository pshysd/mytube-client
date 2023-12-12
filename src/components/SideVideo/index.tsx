import { IVideo } from '@typings/db';
import fetcher from '@utils/fetcher';
import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

function SideVideo() {
	const { data: sideVideos } = useSWR<IVideo[]>('/api/videos', fetcher);

	const sideVideoItem = sideVideos?.map((video, index) => {
		let minutes = Math.floor(video.duration / 60);
		let seconds = Math.floor(video.duration - minutes * 60);

		return (
			<div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }} key={video._id}>
				<div style={{ width: '40%', marginRight: '1rem' }}>
					<Link to={`/video/${video._id}`} style={{ color: 'grey' }}>
						<img src={`http://localhost:3448/${video.thumbnail}`} alt="thumbnail" />
					</Link>
				</div>

				<div style={{ width: '50%' }}>
					<Link to={`/video/${video._id}`} style={{ color: 'grey' }}>
						<span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span>
						<br />
						<span>{video.writer.name}</span>
						<br />
						<span>{video.views}</span>
						<br />
						<span>
							{minutes} : {seconds}
						</span>
					</Link>
				</div>
			</div>
		);
	});

	return (
		<>
			<div style={{ marginTop: '3rem' }}></div>
			{sideVideoItem}
		</>
	);
}

export default SideVideo;
