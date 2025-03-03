import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FullScreenLoader } from './Components/FullScreenLoader';
import { AppContext } from './Contexts/AppContext';
import Router from './Router';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<AppContext.Provider>
					<>
						<Router />
						<FullScreenLoader />
					</>
				</AppContext.Provider>
			</ThemeProvider>
		</>
	);
}

export default App;
