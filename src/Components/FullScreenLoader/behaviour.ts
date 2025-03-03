import { AppContext } from 'src/Contexts/AppContext';

export const useFullScreenLoaderComponentBehaviour = () => {
	const [appContext] = AppContext.useContext();

	return {
		visible: appContext.loaderVisible,
		message: appContext.loaderMessage,
	};
};
