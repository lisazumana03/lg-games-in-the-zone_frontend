import { useEffect, useState } from "react";
import { getAllConsoles } from "../../service/consoleService";

const mockConsoles = [
    { id: "mock1", name: "PS5", price: 0, stock: 0, image: "" },
    { id: "mock2", name: "XBOX", price: 0, stock: 0, image: "" },
    { id: "mock3", name: "PC", price: 0, stock: 0, image: "" },
    { id: "mock4", name: "Nintendo Switch", price: 0, stock: 0, image: "" }
];

export default function ConsoleList() {
    const [consoles, setConsoles] = useState([]);

    useEffect(() => {
        getAllConsoles()
            .then(res => setConsoles(res.data))
            .catch(() => setConsoles([]));
    }, []);

    const displayConsoles = consoles.length > 0 ? consoles : mockConsoles;

    return (
        <div>
            <h2>Console List</h2>
            <div className="row">
                {displayConsoles.map(console => (
                    <div className="col-md-4" key={console.consoleId || console.id}>
                        <div className="card mb-4 shadow-sm">
                            {console.image && (
                                <img src={console.image} alt={console.name || console.consoleName} className="bd-placeholder-img card-img-top" width="100%" height="225"/>
                            )}
                            <div className="card-body">
                                <h5>{console.name || console.consoleName}</h5>
                                <p className="card-text">
                                    <strong>Price:</strong> R{console.price || console.consolePrice} <br/>
                                    <strong>Stock:</strong> {console.stock}<br/>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}