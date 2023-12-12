import axios from 'axios';
import React from 'react';
import { SubsButton } from './styles';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type Props = {
	userTo?: string;
	userFrom?: string | null;
};

function Subscriber({ userTo, userFrom }: Props) {
	const { data: isSubs, mutate: mutateSubs } = useSWR(`/api/subs/${userTo}/${userFrom}`, fetcher);
	const { data: subsCount, mutate: mutateCount } = useSWR(`/api/subs/count?userTo=${userTo}`, fetcher);

	const toggleSubs = () => {
		axios
			.post(`/api/subs`, { userTo, userFrom })
			.then(() => {
				mutateSubs();
				mutateCount();
			})
			.catch((e) => {
				const err = e as Error;
				alert(err.message);
			});
	};

	return (
		<div>
			<SubsButton isSubscribed={isSubs} onClick={toggleSubs}>
				{subsCount} {isSubs ? '구독 중' : '구독하기'}
			</SubsButton>
		</div>
	);
}

export default Subscriber;
