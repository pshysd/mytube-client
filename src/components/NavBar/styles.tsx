import styled from 'styled-components';
import { Drawer as _Drawer, Button as _Button, Menu as _Menu } from 'antd';

export const Wrapper = styled.nav`
	position: fixed;
	z-index: 1;
	width: 100%;
	padding: 0px 20px;
	border-bottom: solid 1px #e8e8e8;
	overflow: auto;
	box-shadow: 0 0 30px #f3f1f1;
	background-color: #fff;
`;

export const Logo = styled.div`
	width: 150px;
	float: left;

	& > a {
		display: inline-block;
		font-size: 20px;
	}

	& > a > img {
		width: 100%;
	}
`;

export const MenuWrapper = styled.div`
	& > .ant-menu-item {
		padding: 0px 5px;
	}

	& > .ant-menu-submenu-title {
		padding: 10px 20px;
	}

	& > .ant-menu-item > a,
	& > .ant-menu-submenu-title > a {
		padding: 10px 15px;
	}

	& > .ant-menu-horizontal {
		border-bottom: none;
	}
`;

export const MobileButton = styled(_Button)`
	float: right;
	height: 32px;
	padding: 6px;
	margin-top: 8px;
	display: none !important;
	background-color: #3e91f7;
`;

export const Drawer = styled(_Drawer)`
	& > .ant-drawer-body {
		padding: 0 !important;
	}

	& > .ant-drawer-header {
		padding: 14px 24px !important;
	}
`;
