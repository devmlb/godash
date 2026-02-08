import { useState, type Dispatch, type JSX, type SetStateAction } from "react";

import "./App.css";
import { openConfig, getOrgansList, getCover, reloadOrgans } from "./utils/api";
import { useApi } from "./utils/hooks/api.hook";
import type { Organ } from "./utils/types/api.types";
import { useBridge } from "./utils/hooks/bridge.hook";
import logo from "./assets/logo.ico";
import { Panel } from "./components/panel/Panel";
import { Grid } from "./components/grid/Grid";

function App(): JSX.Element {
    const pywebviewReady = useBridge();

    const [selected, setSelected] = useState<Organ | null>(null);
    const [reloadTime, setReloadTime] = useState<number>(Date.now());
    const {
        data: organs,
        isLoading,
        error,
    } = useApi<Organ[]>(getOrgansList, [reloadTime], pywebviewReady);

    const reload = async (): Promise<void> => {
        await reloadOrgans();
        setSelected(null);
        setReloadTime(Date.now());
    };

    return (
        <>
            <div className="appbar">
                <div className="branding">
                    <img className="logo" src={logo} />
                    <h1 className="title">GO Dash</h1>
                    <span className="version">
                        {import.meta.env.VITE_VERSION}
                    </span>
                </div>
                <div className="actions">
                    <button onClick={reload}>Recharger</button>
                    <button onClick={openConfig}>Éditer la config</button>
                </div>
            </div>
            <main>
                <Grid />
                <Panel
                    selectedOrgan={selected}
                    pywebviewReady={pywebviewReady}
                />
            </main>
        </>
    );
}

export default App;
