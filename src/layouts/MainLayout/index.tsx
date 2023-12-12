import React from 'react';
import loadable from '@loadable/component';
import { Outlet } from 'react-router-dom';
import { Wrapper } from './styles';

const NavBar = loadable(() => import('../../components/NavBar'));
const Footer = loadable(() => import('../../components/Footer'));

function MainLayout() {
	return (
		<>
			<NavBar />
			<Wrapper>
				<Outlet />
			</Wrapper>
			<Footer />
		</>
	);
}

export default MainLayout;
