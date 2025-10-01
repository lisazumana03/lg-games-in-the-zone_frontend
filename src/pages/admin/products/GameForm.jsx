import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "../../../service/gameService";

function GameForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        gameId: '',
        gameName: '',
        gamingCategory: '',
        gamePrice: 0.0,
        console: null,
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.selectedConsole) {
            setForm((prev) => ({
                ...prev,
                console: location.state.selectedConsole
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "gamePrice" ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create(form);
            setMessage('Game created successfully');
            setForm({
                gameId: '',
                gameName: '',
                gamingCategory: '',
                gamePrice: 0.0,
                console: null,
            });
        } catch (error) {
            console.log(error);
            setMessage('Failed to create game');
        }
    };

    return (
        <div className="container mt-5">
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit} className="p-4 glass-neon mx-auto" style={{ maxWidth: 500 }}>
                <div className="mb-3">
                    <label className="form-label">Game ID:</label>
                    <input
                        name="gameId"
                        value={form.gameId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Game Name</label>
                    <input
                        name="gameName"
                        value={form.gameName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Game Category</label>
                    <select
                        name="gamingCategory"
                        value={form.gamingCategory}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="ACTION">ACTION</option>
                        <option value="SPORT">SPORT</option>
                        {/* ...other categories... */}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Game Price (in ZAR)</label>
                    <input
                        name="gamePrice"
                        type="number"
                        value={form.gamePrice}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Console</label>
                    <div className="d-flex align-items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/select-console")}
                        >
                            {form.console ? "Change Console" : "Select Console"}
                        </button>
                        {form.console && (
                            <span className="badge bg-info text-dark">{form.console.name || form.console}</span>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Create Game
                </button>
            </form>
        </div>
    );
}

export default GameForm;