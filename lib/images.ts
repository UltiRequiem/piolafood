import { TixteClient } from "@ultirequiem/tixte";

import { randomItem } from "./others";

const OUR_DOMAINS = ["likes.cash", "wants.solutions", "is-from.space"];

if (!process.env.TIXTE_CLIENT_KEY) {
  throw new Error("TIXTE_CLIENT_KEY is not set");
}

export const client = new TixteClient(process.env.TIXTE_CLIENT_KEY, {
  defaultURL: `https://piolafood.${randomItem(OUR_DOMAINS)}`,
});
