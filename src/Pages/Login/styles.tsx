import { styled } from 'styled-components';
import { blueGrey } from '@mui/material/colors';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FormWindow = styled.div`
	padding: 16px;
	border-radius: 4px;
	background-color: ${blueGrey[800]};
	border-bottom: solid ${blueGrey[300]} 2px;
	align-items: center;
	display: flex;
	gap: 16px;
`;

export const FieldContainer = styled.div`
	margin-bottom: 16px;
`;

export const CenterButton = styled.div`
	display: flex;
	justify-content: center;
`;
