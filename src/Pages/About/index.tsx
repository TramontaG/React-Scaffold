import React from 'react';
import { useAboutScreenBehaviour } from './behaviour';
import { Button } from '@mui/material';

const AboutPage: React.FC = () => {
	const { goToContact, goToHome } = useAboutScreenBehaviour();

	return (
		<div>
			<h1>About Us</h1>
			<p>
				Welcome to our sample app! We are a team of developers dedicated to creating
				innovative solutions.
			</p>
			<p>
				Our mission is to provide high-quality software that meets the needs of our
				users.
			</p>
			<p>Feel free to reach out to us if you have any questions or feedback.</p>

			<Button variant="outlined" onClick={goToHome}>
				Go to Home
			</Button>

			<Button variant="outlined" onClick={goToContact}>
				Go to Contact
			</Button>
		</div>
	);
};

export default AboutPage;
