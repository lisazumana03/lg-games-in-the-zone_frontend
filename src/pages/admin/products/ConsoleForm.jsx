import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../../service/consoleService";

function ConsoleForm() {
    const [form, setForm] = useState({
        consoleId: "",
        consoleName: "",
        consolePrice: 0,
        stock: 0,
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create(form);
            setMessage("Console created!");
            setForm({ consoleId: "", consoleName: "", consolePrice: 0, stock: 0 });
        } catch {
            setMessage("Error creating console.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-4 glass-neon mx-auto" style={{ maxWidth: 500 }}>
                <div className="mb-3">
                    <label className="form-label">Console ID:</label>
                    <input
                        name="consoleId"
                        value={form.consoleId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Console Name</label>
                    <input
                        name="consoleName"
                        value={form.consoleName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Console Price (in ZAR)</label>
                    <input
                        name="consolePrice"
                        type="number"
                        value={form.consolePrice}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        name="stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Create Console
                </button>
                {message && <div className="mt-3 text-center">{message}</div>}
            </form>
        </div>
    );
}

export default ConsoleForm;