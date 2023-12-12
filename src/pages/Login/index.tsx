import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Form, UserOutlined, Title, LockOutlined, Button, Checkbox, Input, Wrapper } from './styles';

function Login() {
	const { data: userData, mutate: mutateUser } = useSWR('/api/users', fetcher);
	const [loginError, setLoginError] = useState(false);

	const navigate = useNavigate();

	if (userData) navigate('/');

	const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

	const [rememberMe, setRememberMe] = useState(rememberMeChecked);

	const handleRememberMe = useCallback(() => {
		setRememberMe((prev) => !prev);
	}, [rememberMe]);

	const formik = useFormik({
		initialValues: {
			email: localStorage.getItem('email') ?? '',
			password: '',
		},
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const result = await axios.post(
					'/api/users/login',
					{
						email: values.email,
						password: values.password,
					},
					{ withCredentials: true }
				);
				if (result) {
					mutateUser();
					localStorage.setItem('email', values.email);
					if (rememberMe) {
						localStorage.setItem('rememberMe', '1');
					} else {
						localStorage.removeItem('rememberMe');
					}
					navigate('/');
				}
			} catch (e) {
				setLoginError(true);
			}
			setSubmitting(false);
		},
		validationSchema: yup.object({
			email: yup.string().email('올바른 이메일 양식이 아닙니다.').required('이메일을 입력해주세요.'),
			password: yup.string().min(6, '6자 이상의 비밀번호가 필요합니다.').required('비밀번호를 입력해주세요.'),
		}),
	});

	return (
		<Wrapper>
			<Title level={2}>로그인</Title>

			<Form onFinish={formik.handleSubmit}>
				<Form.Item>
					<Input id="email" prefix={<UserOutlined />} placeholder="이메일" type="email" {...formik.getFieldProps('email')} />
					{formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
				</Form.Item>

				<Form.Item>
					<Input id="password" prefix={<LockOutlined />} placeholder="비밀번호" type="password" {...formik.getFieldProps('password')} />
					{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
				</Form.Item>

				<Form.Item>
					<Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>
						아이디 저장
					</Checkbox>
					<Link className="login-form-forgot" to="/reset_user">
						비밀번호 찾기
					</Link>
					<div>
						<Button htmlType="submit" type="primary" className="login-form-button" disabled={formik.isSubmitting}>
							로그인
						</Button>
						{loginError && <div>로그인 실패</div>}
					</div>
					또는 <Link to="/signup">새로 회원가입하기!</Link>
				</Form.Item>
			</Form>
		</Wrapper>
	);
}

export default Login;
