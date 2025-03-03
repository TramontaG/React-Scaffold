import { Button, TextField } from '@mui/material';
import { useLoginScreenBehaviour } from './behaviour';
import { CenterButton, Container, FieldContainer, FormWindow } from './styles';

const LoginPage = () => {
	const { onClickLogin, password, setPassword, setUsername, username } =
		useLoginScreenBehaviour();

	return (
		<Container>
			<FormWindow>
				<h2>Login</h2>
				<form onSubmit={onClickLogin}>
					<FieldContainer>
						<TextField
							variant="outlined"
							type="text"
							id="username"
							label="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
						/>
					</FieldContainer>
					<FieldContainer>
						<TextField
							type="password"
							id="password"
							label="password"
							value={password}
							color="primary"
							onChange={e => setPassword(e.target.value)}
							required
							fullWidth
						/>
					</FieldContainer>
					<CenterButton>
						<Button variant="outlined" type="submit" fullWidth>
							Login
						</Button>
					</CenterButton>
				</form>
			</FormWindow>
		</Container>
	);
};

export default LoginPage;
