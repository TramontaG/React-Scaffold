import { AppContext } from 'src/Contexts/AppContext';

export const useFullScreenLoader = () => {
	const [appContext, setAppContext] = AppContext.useContext();

	const showLoader = (message?: string) =>
		setAppContext({
			loaderVisible: true,
			loaderMessage: message ?? '',
		});

	const hideLoader = () =>
		setAppContext({
			loaderVisible: false,
		});

	const toggleLoader = (message?: string) =>
		setAppContext({
			loaderVisible: !appContext.loaderVisible,
			loaderMessage: message ?? '',
		});

	return {
		showLoader,
		hideLoader,
		toggleLoader,
	};
};
