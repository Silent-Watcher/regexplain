import Enquirer from 'enquirer';
import Groq from 'groq-sdk';
import { HttpsProxyAgent } from 'https-proxy-agent';
import keytar from 'keytar';
import ora from 'ora';
import { ACCOUNT_NAME, SERVICE_NAME } from '../utils/constants';
import { prompt as aiPrompt } from './prompt';

function isValidUrl(input: string) {
	try {
		new URL(input);
		return true;
	} catch (_error) {
		return false;
	}
}

async function getApiKey() {
	try {
		const { prompt } = Enquirer;
		// 1. Check env
		if (process.env.GROQ_API_KEY) {
			return process.env.GROQ_API_KEY;
		}

		// 2. Check keytar
		const savedKey = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
		if (savedKey) {
			return savedKey;
		}

		// 3. Prompt user
		const { apiKey: newKey } = (await prompt({
			type: 'password',
			name: 'apiKey',
			message: 'Enter your Groq API key:',
			validate: (value: string) =>
				value.trim() === '' ? 'API key cannot be empty' : true,
			initial: '',
			result: (value: string) => value.trim(),
			stdin: process.stdin,
			stdout: process.stdout,
		})) as { apiKey: string };

		await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, newKey);
		console.log('\n✅ API key saved securely!');
		return newKey;
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

async function getHttpProxyAgent(): Promise<
	HttpsProxyAgent<string> | undefined
> {
	const envProxy = process.env.HTTPS_PROXY || process.env.https_proxy;

	if (envProxy) {
		console.log('Using proxy from environment variables');
		return new HttpsProxyAgent(envProxy);
	}

	const { setProxy } = await Enquirer.prompt<{ setProxy: boolean }>({
		type: 'confirm',
		name: 'setProxy',
		message: 'Do you want to set a proxy?',
		initial: false,
	});

	if (!setProxy) return undefined;

	const { proxyAddr } = await Enquirer.prompt<{ proxyAddr: string }>({
		type: 'input',
		name: 'proxyAddr',
		message: 'Enter proxy address (e.g., http://user:pass@localhost:7890):',
		validate: (value) => isValidUrl(value) || 'Invalid URL format',
	});

	return new HttpsProxyAgent(proxyAddr);
}

// Main function
export async function explain(regex: string) {
	try {
		const apiKey = await getApiKey();
		const httpAgent = await getHttpProxyAgent();

		const groq = new Groq({ apiKey, ...(httpAgent ? { httpAgent } : {}) });

		const spinner = ora('loading ....').start();
		const completion = await groq.chat.completions.create({
			model: 'openai/gpt-oss-20b',
			messages: [
				{ role: 'system', content: 'You are a regex explainer.' },
				{ role: 'user', content: aiPrompt(regex) },
			],
		});

		spinner.stop().clear();

		console.log('\n📖 Explanation:\n');
		if (
			completion.choices &&
			completion.choices[0] &&
			completion.choices[0].message
		) {
			console.log(completion.choices[0].message.content);
		} else {
			console.error(
				'Error: Completion result is undefined or malformed.',
			);
		}
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
