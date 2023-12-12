import { Button as antdButton } from 'antd';
import antdTextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';

export const Button = styled(antdButton)`
  width: 20%;
  height: 52px;
`;

export const TextArea = styled(antdTextArea)`
  width: 100%;
  border-radius: 5px;
`;
