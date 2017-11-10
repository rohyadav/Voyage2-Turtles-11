export function WeatherIcon(name) {
	var iconLink = "hello";
	switch (name) {
		case '01d':
			iconLink = "http://i.imgur.com/NH5UFMl.png";
			break;
		case '01n':
			iconLink = "http://i.imgur.com/BBtDF1t.png";
			break;
		case '02d':
			iconLink = "http://i.imgur.com/fXyYwSp.png";
			break;
		case '02n':
			iconLink = "http://i.imgur.com/liFgu8X.png";
			break;
		case '03d':
		case '03n':
		case '04d':
		case '04n':
			iconLink = "http://i.imgur.com/zlPH7UO.png";
			break;
		case '09d':
		case '09n':
		case '10d':
		case '10n':
			iconLink = "http://i.imgur.com/Xg6MDvJ.png";
			break;
		case '11d':
		case '11n':
			iconLink = "http://i.imgur.com/DnTGukb.png";
			break;
		case '13d':
		case '13n':
			iconLink = "http://i.imgur.com/26kG1IW.png";
			break;
		case '50d':
		case '50n':
			iconLink = "http://i.imgur.com/C056uhg.png";
			break;
		default:
			iconLink = "http://i.imgur.com/NH5UFMl.png";
			break;
	}
	return iconLink;
};
