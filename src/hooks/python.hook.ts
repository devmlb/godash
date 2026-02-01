import { useState, useEffect } from "react";

async function usePythonApi(apiName: string, ...apiContent: unknown[]) {
	
	useEffect(() => {

	}, [])

	// Wait for the pywebviewready event
	if (!window._pywebviewReady) {
		await new Promise<void>((resolve) => {
			const handler = (): void => {
				window._pywebviewReady = true;
				window.removeEventListener("pywebviewready", handler);
				resolve();
			};
			window.addEventListener("pywebviewready", handler);
		});
	}
	
	return await window.pywebview.api[apiName](...apiContent);
}

export { usePythonState, usePythonApi };