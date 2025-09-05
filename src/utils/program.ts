import sade from "sade";
import { description, version } from "../../package.json";

export function runProgram() {
	const program = sade("regexplain <regex>");

	program
		.version(version)
		.describe(description)
		.action((regex: string) => {
		}).parse(process.argv);
}
