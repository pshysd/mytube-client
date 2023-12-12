import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const MainLayout = loadable(() => import('@layouts/MainLayout'));
const LandingPage = loadable(() => import('@pages/LandingPage'));
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const UploadVideo = loadable(() => import('@pages/UploadVideo'));
const DetailVideo = loadable(() => import('@pages/DetailVideo'));
const Subscription = loadable(() => import('@pages/Subscription'));

function App() {
	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/video/upload" element={<UploadVideo />} />
					<Route path="/video/:videoId" element={<DetailVideo />} />
					<Route path="/subscription" element={<Subscription />} />;
				</Route>
			</Routes>
		</>
	);
}

export default App;
