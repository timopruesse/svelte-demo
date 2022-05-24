module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			keyframes: {
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				'lightring-pulse': {
					'0%': { 'border-color': 'rgba(136, 19, 55, 0.1)' },
					'50%': { 'border-color': 'rgba(136, 19, 55, 1.0)' },
					'100%': { 'border-color': 'rgba(136, 19, 55, 0.1)' }
				}
			},
			animation: {
				'fade-in': 'fade-in .5s linear forwards',
				'lightring-pulse': 'lightring-pulse 2.5s ease-in-out infinite'
			}
		}
	}
};
