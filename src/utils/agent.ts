import { HttpsProxyAgent } from "https-proxy-agent";

export function createHttpsProxyAgent(): HttpsProxyAgent<string> | undefined {
	const proxy = process.env?.HTTPS_PROXY as string; // replace with your proxy
	if (proxy) {
		return new HttpsProxyAgent(proxy);
	}
	return undefined;
}
