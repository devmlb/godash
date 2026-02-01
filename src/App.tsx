import type { JSX } from "react";

import "./App.css";

function App(): JSX.Element {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({ name: "NDTJ", creator: "Debierre", date: 1850 });
    }

    return (
        <>
            <div className="appbar">
                <h1 className="app-title">GO Dash</h1>
                <div className="actions">
                    <button>Éditer la config</button>
                </div>
            </div>
            <main className="main-grid">
                {data.map((organ) => {
                    return (
                        <div
                            key={organ.name.toLowerCase().replaceAll(" ", "-")}
                            className="organ"
                        >
                            <div className="preview" />
                            <div className="content">
                                <h3 className="name">{organ.name}</h3>
                                <div className="infos">{`${organ.creator} • ${organ.date.toString()}`}</div>
                            </div>
                        </div>
                    );
                })}
            </main>
        </>
    );
}

export default App;
