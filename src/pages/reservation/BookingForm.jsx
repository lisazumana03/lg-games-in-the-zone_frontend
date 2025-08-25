import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../service/bookingService.js";

function BookingForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        bookingId: "",
        eventName: "",
        eventDescription: "",
        numberOfMembers: 0,
        eventDuration: 0,
        bookingDate: "",
        bookingStatus: "pending",
    });

    const [message, setMessage] = useState("")

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
                bookingStatus: "pending",
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {message && <div className="alert alert-success">{message}</div>}
                    <form onSubmit={handleSubmit} className="card p-4 shadow">
                        <div className="mb-3">
                            <label className="form-label">Booking Id</label>
                            <input type="text" name="bookingId" value={form.bookingId} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Event Name</label>
                            <input type="text" name="eventName" value={form.eventName} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Event Description</label>
                            <input type="text" name="eventDescription" value={form.eventDescription} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Number of Members</label>
                            <input type="number" name="numberOfMembers" value={form.numberOfMembers} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Event Duration</label>
                            <input type="number" name="eventDuration" value={form.eventDuration} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Booking Date & Time</label>
                            <input type="datetime-local" name="bookingDate" value={form.bookingDate} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Booking Status</label>
                            <select name="bookingStatus" value={form.bookingStatus} onChange={handleChange} required className="form-select">
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => setForm({
                                bookingId: "",
                                eventName: "",
                                eventDescription: "",
                                numberOfMembers: 0,
                                eventDuration: 0,
                                bookingDate: "",
                                bookingStatus: "pending",
                            })}>Reset</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingForm;