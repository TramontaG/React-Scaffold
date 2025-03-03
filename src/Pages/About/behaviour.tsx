import { useNavigate } from 'react-router';

export const useAboutScreenBehaviour = () => {
	const navigate = useNavigate();

	const goToHome = () => navigate('/home');
	const goToContact = () => navigate('/contact');

	return {
		goToHome,
		goToContact,
	};
};
