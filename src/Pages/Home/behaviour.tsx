import { useNavigate } from 'react-router';

export const useHomeScreenBehaviour = () => {
	const navigate = useNavigate();

	const goToAbout = () => navigate('/about');
	const goToContact = () => navigate('/contact');

	return {
		goToAbout,
		goToContact,
	};
};
