import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFullScreenLoader } from 'src/Hooks/useFullScreenLoader';

export const useLoginScreenBehaviour = () => {
	const navigate = useNavigate();
	const { showLoader, hideLoader } = useFullScreenLoader();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onClickLogin = (event: React.FormEvent) => {
		event.preventDefault();
		showLoader('This login form is fake...');
		setTimeout(() => {
			navigate('/home');
			hideLoader();
		}, 3000);
	};

	return {
		username,
		setUsername,
		password,
		setPassword,
		onClickLogin,
	};
};
