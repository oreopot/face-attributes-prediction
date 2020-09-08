import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

function CustomTheme() {
	return createMuiTheme({
		palette: {
			primary: {
				main: '#fdcb6e',
				// mainGradient: 'linear-gradient(to right, tomato, cyan)',
				mainGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
				alternateGradient: 'linear-gradient(45deg, #37ecba 0%, #72afd3 90%)',
			},
			secondary: {
				main: green[500],
			},
		},
		typography: {
			fontFamily: 'Space Mono',
		},
	});
}
export default CustomTheme;
