import { Button } from '@mui/material';
import { useHomeScreenBehaviour } from './behaviour';

const HomePage: React.FC = () => {
	const { goToAbout, goToContact } = useHomeScreenBehaviour();

	return (
		<div>
			<h1>Welcome to the Sample App</h1>
			<p>This is a sample home page for our application.</p>
			<Button variant="outlined" onClick={goToAbout}>
				Go to About Page
			</Button>
			<Button variant="outlined" onClick={goToContact}>
				Go to Contact Page
			</Button>
		</div>
	);
};

export default HomePage;
