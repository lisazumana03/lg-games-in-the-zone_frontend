import React from 'react';

function RegisterPage() {
    return(
        <div>
            <form className="m-3 p-3 border border-2 border-dark rounded shadow ">
                <label> Name (optionally surname): </label>
                <input type="text" name="name" placeholder="Enter your name" required />
                <br />
                <label> Username : </label>
                <input type="text" name="username" placeholder="Enter your username" required />
                <br />
                <label> Email : </label>
                <input type="email" name="email" placeholder="Enter your email" required />
                <br />
                <label> Enter Password : </label>
                <input type="password" name="password" placeholder="Enter your password" required />
                <br />
                <label> Confirm Password : </label>
                <input type="password" name="confirmPassword" placeholder="Confirm your password" required />
                <br />
                <button type="submit"> Register </button>
            </form>
        </div>
    )
}

export default RegisterPage;