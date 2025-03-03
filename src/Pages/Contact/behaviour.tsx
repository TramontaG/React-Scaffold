import { useNavigate } from 'react-router';

export const useContactScreenBehaviour = () => {
	const navigate = useNavigate();

	const goToHome = () => navigate('/home');
	const goToAbout = () => navigate('/about');

	return {
		goToHome,
		goToAbout,
	};
};
