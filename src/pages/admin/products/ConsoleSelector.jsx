import { useEffect, useState } from "react";
import { getAllConsoles } from "../../service/consoleService";

function ConsoleSelector({ onPick }) {
    const [consoles, setConsoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllConsoles()
            .then(res => setConsoles(res.data))
            .catch(() => setConsoles([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading consoles...</div>;

    return (
        <div>
            <h2>Pick a Console</h2>
            <div className="row">
                {consoles.map(console => (
                    <div className="col-md-4" key={console.consoleId}>
                        <div className="card mb-4 shadow-sm">
                            {/* If you have images, use <img src={console.image} ... /> */}
                            <div className="card-body">
                                <h5>{console.consoleName}</h5>
                                <p className="card-text">
                                    <strong>Price:</strong> R{console.consolePrice} <br />
                                    <strong>Stock:</strong> {console.stock}<br />
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => onPick && onPick(console)}
                                >
                                    Pick
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConsoleSelector;
