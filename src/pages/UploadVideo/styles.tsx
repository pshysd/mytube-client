import styled from 'styled-components';
import { Typography as _Typography, Button as _Button, Form as _Form, Input as _Input } from 'antd';

const { Title: _Title } = _Typography;
const { TextArea: _TextArea } = _Input;

export const Button = styled(_Button)``;
export const Title = styled(_Title)``;
export const TextArea = styled(_TextArea)``;
export const Form = styled(_Form)`
	& > div {
	}
`;
export const Input = styled(_Input)``;
export const Wrapper = styled.div`
	max-width: 700px;
	margin: 2rem auto;
`;
