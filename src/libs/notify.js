"use client";

import { toast } from "sonner";

/**
 * Drop-in helpers replacing the pruned sweetalert2 (`Swal.fire`) usage.
 * Prefer importing `toast` from "sonner" directly in new code.
 */
export const notify = {
	success: (message, description) =>
		toast.success(message, description ? { description } : undefined),
	error: (message, description) =>
		toast.error(message, description ? { description } : undefined),
	info: (message, description) =>
		toast.info(message, description ? { description } : undefined),
	warning: (message, description) =>
		toast.warning(message, description ? { description } : undefined),
	message: (message, description) =>
		toast.message(message, description ? { description } : undefined),
};

export { toast };
