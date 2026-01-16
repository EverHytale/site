// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://everhytale.fr',
	integrations: [
		starlight({
			title: 'EverHytale',
			description: 'Documentation for EverHytale plugins for Hytale servers',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/everhytale' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/aDdR2nN9' },
			],
			sidebar: [
				{
					label: 'Home',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Getting Started', slug: 'guides/getting-started' },
					],
				},
				{
					label: 'Infrastructure',
					items: [
						{ label: 'Overview', slug: 'infrastructure/overview' },
						{ label: 'Docker', slug: 'infrastructure/docker' },
						{ label: 'Docker Compose', slug: 'infrastructure/docker-compose' },
						{ label: 'Kubernetes (Helm)', slug: 'infrastructure/kubernetes' },
					],
				},
				{
					label: 'Plugins',
					items: [
						{
							label: 'EverEssentials',
							autogenerate: { directory: 'plugins/everessentials' },
						},
					],
				},
				{
					label: 'Development',
					items: [
						{ label: 'API', slug: 'development/api' },
						{ label: 'Contributing', slug: 'development/contributing' },
					],
				},
				{
					label: 'Resources',
					autogenerate: { directory: 'resources' },
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
			editLink: {
				baseUrl: 'https://github.com/everhytale/docs/edit/main/',
			},
		}),
	],
});
