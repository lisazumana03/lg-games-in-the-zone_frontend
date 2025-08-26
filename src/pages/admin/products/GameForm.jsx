import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {create} from "../../../service/gameService.js";

function GameForm(){
    const navigate = useNavigate();
    const [form, setForm] = useState({
        gameId: '',
        gameName: '',
        gamingCategory: '',
        gamePrice: 0.0,
        console: [],
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

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
                console: [],
            });
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            {message && <p className="mb-4 text-green-700 font-semibold">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label> Game Id </label>
                    <input />
                </div>
                <div className="mb-4">
                    <label> Game Name </label>
                </div>
                <div className="mb-4">
                    <label> Game Category: </label>
                    <select onChange={handleChange}>
                        <option>ACTION</option>
                        <option>SPORT</option>
                    </select>
                </div>
                <div>
                    <label>Game Price (in ZAR):</label>
                    <input />
                </div>
                <div className="mb-4">
                    <label> Console: </label>
                    <select onChange={handleChange}></select>
                </div>
            </form>
        </div>
    )
}

export default GameForm;