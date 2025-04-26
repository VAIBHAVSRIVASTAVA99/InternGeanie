
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  // Proism custom colors
		  purple: {
			light: '#8A2BE2',
			DEFAULT: '#5A2CA0',
			dark: '#4A0E95',
		  },
		  proism: {
			dark: '#040405',
			light: '#d1d1d2',
			purple: '#4d0e95',
			accent: '#593a62',
			secondary: '#290860',
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-10px)' },
		  },
		  pulse: {
			'0%, 100%': { opacity: 1 },
			'50%': { opacity: 0.5 },
		  },
		  fadeIn: {
			'0%': { opacity: 0 },
			'100%': { opacity: 1 },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "float": "float 5s ease-in-out infinite",
		  "pulse": "pulse 3s ease-in-out infinite",
		  "fadeIn": "fadeIn 1s ease-in-out",
		},
		backgroundImage: {
		  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
		  'noise': "url('https://ext.same-assets.com/1016765841/354914685.webp')",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  