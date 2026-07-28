import { draftMode } from "next/headers";
import Link from "next/link";

const DraftModeBanner = async () => {
	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		return null;
	}

	return (
		<div className="fixed inset-x-0 top-0 z-9999 bg-amber-400 px-4 py-2 text-center text-sm font-medium text-amber-950 shadow-md">
			Preview mode — you are viewing unpublished WordPress content.{" "}
			<Link href="/api/draft/disable" className="underline underline-offset-2">
				Exit preview
			</Link>
		</div>
	);
};

export default DraftModeBanner;
