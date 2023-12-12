import styled from 'styled-components';
import { UserOutlined as _UserOutlined, LockOutlined as _LockOutlined } from '@ant-design/icons';
import { Form as _Form, Input as _Input, Button as _Button, Checkbox as _Checkbox, Typography as _Typography, Typography } from 'antd';

export const Wrapper = styled.div`
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const Form = styled(_Form)`
	width: 350px;

	& .login-form-forgot {
		float: right;
	}
`;

export const UserOutlined = styled(_UserOutlined)`
	color: rgba(0, 0, 0, 0.25);
`;

export const LockOutlined = styled(_LockOutlined)`
	color: rgba(0, 0, 0, 0.25);
`;

export const Title = styled(Typography.Title)``;

export const Input = styled(_Input)``;

export const Button = styled(_Button)`
	min-width: 100%;
`;

export const Checkbox = styled(_Checkbox)``;
