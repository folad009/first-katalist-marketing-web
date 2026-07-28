"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";

/**
 * Drop-in replacement for the pruned `src/libs/modal.js` Bootstrap/jQuery modal.
 * Wraps shadcn Dialog and keeps the same composition surface for callers.
 */
const AppDialog = ({
	open,
	onOpenChange,
	trigger,
	title,
	description,
	children,
	footer,
	contentClassName,
	showCloseButton = true,
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
			<DialogContent
				showCloseButton={showCloseButton}
				className={contentClassName}
			>
				{(title || description) && (
					<DialogHeader>
						{title ? <DialogTitle>{title}</DialogTitle> : null}
						{description ? (
							<DialogDescription>{description}</DialogDescription>
						) : null}
					</DialogHeader>
				)}
				{children}
				{footer ? <DialogFooter>{footer}</DialogFooter> : null}
			</DialogContent>
		</Dialog>
	);
};

export {
	AppDialog,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
};
export default AppDialog;
