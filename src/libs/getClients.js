import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapClients } from "@/lib/wordpress-mappers";
import { GET_CLIENTS } from "@/lib/wordpress-queries";
import { cache } from "react";
import clients from "../constants/clients.json";

/** Client logos from WordPress → Clients (falls back to src/constants/clients.json). */
const getClients = cache(async () =>
	withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_CLIENTS, { tags: [REVALIDATE_TAGS.clients] });
		return mapClients(data?.clients?.nodes ?? []);
	}, clients)
);

export default getClients;
