import { AlignRightOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MobileButton, Drawer, Wrapper, Logo, MenuWrapper } from './styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';
import Menu from '@components/Menu';

function NavBar() {
	const { data: userData, mutate: mutateUser } = useSWR<IUser>('/api/users', fetcher);

	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const [logoutError, setLogoutError] = useState(false);

	const toggleDrawer = useCallback(() => {
		setVisible((prev) => !prev);
	}, [visible]);

	const onLogout = useCallback(() => {
		axios
			.post('/api/users/logout')
			.then(() => {
				mutateUser();
				navigate('/');
			})
			.catch(() => {
				setLogoutError(true);
			});
	}, [userData]);

	const leftItems = useMemo(() => {
		return [
			{
				label: <Link to="/">홈으로</Link>,
				key: 'home',
			},
			{
				label: <Link to="/subscription">구독</Link>,
				key: 'subscription',
			},
		];
	}, []);

	const rightItems = useMemo(() => {
		if (userData) {
			return [
				{
					label: (
						<Link to="/video/upload">
							<UploadOutlined />
						</Link>
					),
					key: 'create',
				},
				{
					label: <span onClick={onLogout}>로그아웃</span>,
					key: 'logout',
				},
			];
		} else {
			return [
				{
					label: <Link to="/login">로그인</Link>,
					key: 'login',
				},
				{
					label: <Link to="/signup">회원가입</Link>,
					key: 'signup',
				},
			];
		}
	}, [userData]);

	return (
		<Wrapper>
			<Logo>
				<Link to="/">
					<img src={'@assets/HappyTubeLogo.png'} alt="로고" />
				</Link>
			</Logo>
			<MenuWrapper>
				<div style={{ float: 'left' }}>
					<Menu mode="horizontal" items={leftItems}></Menu>
				</div>
				<div style={{ float: 'right' }}>
					<Menu mode="horizontal" items={rightItems} />
				</div>
				<MobileButton type="primary" onClick={toggleDrawer}>
					<AlignRightOutlined />
				</MobileButton>
				<Drawer title="Basic Drawer" placement="right" closable={false} onClose={toggleDrawer} open={visible}>
					<Menu mode="inline" items={leftItems.concat(rightItems)} />
				</Drawer>
			</MenuWrapper>
		</Wrapper>
	);
}

export default NavBar;
