import sade from "sade";
import { description, version } from "../../package.json";
import { explain } from "../ai/explain";

export function runProgram() {
	const program = sade("regexplain <regex>");

	program
		.version(version)
		.describe(description)
		.action((regex: string) => {
			explain(regex).catch((error) => {
				console.error("Error:", error.message);
				process.exit(1);
			});
		}).parse(process.argv);
}
