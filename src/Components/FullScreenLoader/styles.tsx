import { styled } from 'styled-components';
import { blueGrey } from '@mui/material/colors';

export const Container = styled.div<{ visible: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 99999;
	pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	background-color: ${blueGrey['900']}BB;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	transition: opacity 0.3s ease-in-out;
	flex-direction: column;
	gap: 40px;
`;
