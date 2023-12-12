import styled from 'styled-components';
const grey = '#aaaaaa';
const crimsonRed = '#cc0000';
interface SubsButtonProps {
	isSubscribed: boolean;
}
export const SubsButton = styled.button<SubsButtonProps>`
	background-color: ${({ isSubscribed }) => (isSubscribed ? grey : crimsonRed)};
	border-radius: 4px;
	color: #ffffff;
	padding: 10px 16px;
	font-weight: 500;
	font-size: 1rem;
`;
