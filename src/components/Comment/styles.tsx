import styled from 'styled-components';
import { Avatar as _Avatar, Button as _Button } from 'antd';
import { Comment as _Comment } from '@ant-design/compatible';
import _TextArea from 'antd/lib/input/TextArea';

export const CommentArea = styled(_Comment)``;
export const Avatar = styled(_Avatar)``;
export const Button = styled(_Button)`
	width: '20%';
	height: '52px';
`;
export const TextArea = styled(_TextArea)`
	width: 100%;
	border-radius: '5px';
`;
export const Form = styled.form`
	display: flex;
`;
