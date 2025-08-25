import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {create} from "../../service/bookingService.js";

function BookingForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        bookingId: "",
        eventName: "",
        eventDescription: "",
        numberOfMembers: 0,
        eventDuration: 0,
        bookingDate: "",
        bookingStatus: "PENDING",
    });

    const [message, setMessage] = useState(" ")

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await create(form);
            setMessage("Booking made successfully!");
            setForm({
                bookingId: "",
                eventName: "",
                eventDescription: "",
                numberOfMembers: 0,
                eventDuration: 0,
                bookingDate: "",
                bookingStatus: "PENDING",
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {message && <p className="mb-4 text-green-700 font-semibold">{message}</p>}
            <form onSubmit={handleSubmit} className="bg-red-100 p-8 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label> BookingId </label>
                    <input type="text" name="bookingId" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label> Event Name </label>
                    <input type="text" name="eventName" value={form.eventName} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label> Event Description </label>
                    <input type="text" name="eventDescription" value={form.eventDescription} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label> Number of Members </label>
                    <input type="number" name="numberOfMembers" value={form.numberOfMembers} onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label> Event Duration </label>
                    <input type="number" name="eventDuration" onChange={handleChange} required />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Booking Date & Time</label>
                    <input type="datetime-local" name="bookingDateAndTime" value={form.bookingDate} onChange={handleChange} required className="w-full px-3 py-2 border rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Booking Status</label>
                    <select name="bookingStatus" value={form.bookingStatus} onChange={handleChange} required className="w-full px-3 py-2 border rounded">
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded hover:bg-red-700">Submit</button>
                    <button type="reset" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-gray-400" onClick={() => setForm({
                        bookingId: "",
                        eventName: "",
                        eventDescription: "",
                        numberOfMembers: 0,
                        eventDuration: 0,
                        bookingDate: "",
                        bookingStatus: "PENDING",
                    })}>Reset</button>
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate("/")}>Back</button>
                </div>
            </form>
        </div>
    )
}

export default BookingForm;