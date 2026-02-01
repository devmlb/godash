interface PywebviewApi {
    [key: string]: (...args : any[]) => any // eslint-disable-line
}

interface PywebviewState {
    [key: string]: (...args : any[]) => any // eslint-disable-line
}

interface Pywebview {
    api: PywebviewApi,
    state: PywebviewState
};

declare global {
    interface Window {
        pywebview: Pywebview;
        writeProgress?: (v: string) => void;
        writeProgressDesc?: (v: string) => void;
        _pywebviewReady?: boolean
    }
}

export { };