import axios from "axios";
import { useEffect, useState } from "react";

function GameList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4531/api/games") // Adjust endpoint as needed
            .then(res => setGames(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container py-4">
            <div className="row">
                {games.map(game => (
                    <div className="col-md-4 mb-4" key={game.gameId}>
                        <div className="card h-100">
                            <img src={game.imageUrl || "https://via.placeholder.com/300x200?text=Game+Image"} className="card-img-top" alt={game.gameName} />
                            <div className="card-body">
                                <h5 className="card-title">{game.gameName}</h5>
                                <p className="card-text">
                                    <strong>Category:</strong> {game.gamingCategory}<br />
                                    <strong>Price:</strong> ${game.gamePrice}<br />
                                    <strong>Console:</strong> {game.console?.join(", ") || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameList;