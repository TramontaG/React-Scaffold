import { createContext } from '..';

// Add all the variables that should be global to your app here!
export const AppContext = createContext({
	loaderVisible: false,
	loaderMessage: '',
});
