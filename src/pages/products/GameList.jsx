import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GameList() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    // Five mock games
    const mockGames = [
        {
            gameId: "1",
            gameName: "FC24",
            gamingCategory: "SPORT",
            gamePrice: 899.99,
            console: ["PS5"],
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.g9sG3f7lgl91iCz61IkQoQHaJO?rs=1&pid=ImgDetMain&o=7&rm=3"
        },
        {
            gameId: "2",
            gameName: "Call of Duty: Modern Warfare III",
            gamingCategory: "ACTION",
            gamePrice: 1099.99,
            console: ["XBOX"],
            imageUrl: "https://www.bigw.com.au/medias/sys_master/images/images/h45/h34/45446615859230.jpg"
        },
        {
            gameId: "3",
            gameName: "Minecraft",
            gamingCategory: "ADVENTURE",
            gamePrice: 399.99,
            console: ["PC"],
            imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/38eb60f7-015f-4e9a-a98c-0f81cb883d0f/dg3rj58-5cf5800a-6f42-42a4-9a1d-cc5d619c5d81.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM4ZWI2MGY3LTAxNWYtNGU5YS1hOThjLTBmODFjYjg4M2QwZlwvZGczcmo1OC01Y2Y1ODAwYS02ZjQyLTQyYTQtOWExZC1jYzVkNjE5YzVkODEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4u6Fga8fmpD-s6n7hoPLqvcRLEeOTo08DfKfMC0_Fl8"
        },
        {
            gameId: "4",
            gameName: "Gran Turismo 7",
            gamingCategory: "RACING",
            gamePrice: 799.99,
            console: ["PS5"],
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.GQXR44GGn1Fnon3l6hvR9wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
        },
        {
            gameId: "5",
            gameName: "NBA 2K24",
            gamingCategory: "SPORT",
            gamePrice: 949.99,
            console: ["XBOX"],
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.phF9e7JzoICR7oaciDrE8QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
        }
    ];

    useEffect(() => {
        axios.get("http://localhost:4531/api/games")
            .then(res => setGames(res.data))
            .catch(() => setGames([]));
    }, []);

    const displayGames = games.length > 0 ? games : mockGames;

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">Game List</h2>
            <div className="row">
                {displayGames.map(game => (
                    <div className="col-md-4 mb-4" key={game.gameId}>
                        <div className="card h-100">
                            <img src={game.imageUrl || "https://via.placeholder.com/300x200?text=Game+Image"} className="card-img-top" alt={game.gameName} />
                            <div className="card-body">
                                <h5 className="card-title">{game.gameName}</h5>
                                <p className="card-text">
                                    <strong>Category:</strong> {game.gamingCategory}<br />
                                    <strong>Price:</strong> ZAR {game.gamePrice}<br />
                                    <strong>Console:</strong> {game.console?.join(", ") || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="back-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate("/")}> Back to Home </button>
        </div>
    );
}

export default GameList;