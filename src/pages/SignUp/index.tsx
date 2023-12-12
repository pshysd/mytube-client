import React from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Input, Wrapper } from './styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

function SignUp() {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},

		validationSchema: yup.object({
			name: yup.string().required('이름을 입력해주세요.'),
			email: yup.string().email().required('이메일을 입력해주세요.'),
			password: yup.string().min(10, '비밀번호는 최소 10자 이상이여야 합니다.').required('비밀번호를 입력해주세요.'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password'), '비밀번호와 동일하게 입력해주세요.'])
				.required('필수로 입력해주셔야합니다.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			const signUpData = {
				email: values.email,
				name: values.name,
				password: values.password,
				image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
			};
			try {
				const result = await axios.post('/api/users', signUpData, {
					withCredentials: true,
				});
				if (result) {
					setSubmitting(false);
					alert('회원가입이 완료되었습니다! 로그인 해주세요.');
					navigate('/login');
				}
			} catch (e) {
				const err = e as Error;
				alert(err.response.data);
			}
		},
	});
	return (
		<Wrapper>
			<h2>회원가입</h2>
			<Form onFinish={formik.handleSubmit} method="post" {...formItemLayout}>
				<Form.Item required label="name">
					<Input id="name" placeholder="이름을 입력해주세요." type="text" {...formik.getFieldProps('name')} />
					{formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
				</Form.Item>

				<Form.Item required label="email">
					<Input id="email" placeholder="이메일을 입력해주세요." type="email" {...formik.getFieldProps('email')} />
					{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
				</Form.Item>

				<Form.Item required label="password">
					<Input id="password" placeholder="비밀번호를 입력해주세요." type="password" {...formik.getFieldProps('password')} />
					{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
				</Form.Item>

				<Form.Item required label="confirmPassword">
					<Input
						id="confirmPassword"
						placeholder="비밀번호와 동일해야 합니다."
						type="password"
						{...formik.getFieldProps('confirmPassword')}
					/>
					{formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<Button htmlType="submit" type="primary" disabled={formik.isSubmitting}>
						회원가입
					</Button>
				</Form.Item>
			</Form>
		</Wrapper>
	);
}

export default SignUp;
