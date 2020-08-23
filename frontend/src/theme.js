import { createMuiTheme } from '@material-ui/core/styles';
import { purple, green } from '@material-ui/core/colors';

export default function CustomTheme() {
	return createMuiTheme({
		palette: {
			primary: {
				main: '#ff4400',
				// mainGradient: 'linear-gradient(to right, tomato, cyan)'
				mainGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
				// mainGradient: 'linear-gradient(45deg, #37ecba 0%, #72afd3 90%)'
			},
			secondary: {
				main: green[500]
			}
		},
		typography: {
			fontFamily: 'Space Mono'
		}
	});
}
