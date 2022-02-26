import { TixteClient } from "@ultirequiem/tixte";

const OUR_DOMAINS = ["wants.solutions", "is-from.space"];

if (!process.env.TIXTE_CLIENT_KEY) {
	throw new Error("TIXTE_CLIENT_KEY is not set");
}

export const client = new TixteClient(process.env.TIXTE_CLIENT_KEY, {
	defaultURL: `piolafood.${OUR_DOMAINS[1]}`,
});
