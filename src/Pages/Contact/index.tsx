import React from 'react';
import { useContactScreenBehaviour } from './behaviour';
import { Button } from '@mui/material';

const ContactPage: React.FC = () => {
	const { goToAbout, goToHome } = useContactScreenBehaviour();

	return (
		<div>
			<h1>Contact Us</h1>
			<p>
				Feel free to reach out to us using the form below or via email at
				contact@example.com.
			</p>
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" required />
				</div>
				<div>
					<label htmlFor="message">Message</label>
					<textarea id="message" name="message" required></textarea>
				</div>
				<button type="submit">Send Message</button>
			</form>

			<Button variant="outlined" onClick={goToAbout}>
				Go to About
			</Button>
			<Button variant="outlined" onClick={goToHome}>
				Go to Home
			</Button>
		</div>
	);
};

export default ContactPage;
