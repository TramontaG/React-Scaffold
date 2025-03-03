import { CircularProgress } from '@mui/material';
import { Container } from './styles';
import { useFullScreenLoaderComponentBehaviour } from './behaviour';

export const FullScreenLoader = () => {
	const { visible, message } = useFullScreenLoaderComponentBehaviour();
	return (
		<Container visible={visible}>
			<CircularProgress size={'7.5vw'} color="primary" />
			<span>{message}</span>
		</Container>
	);
};
