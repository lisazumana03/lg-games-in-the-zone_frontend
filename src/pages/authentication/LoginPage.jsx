function LoginPage(){
    return(
        <div>
            <form className="m-3 p-3 border border-2 border-dark rounded shadow ">
                <label> Email : </label>
                <input type="email" name="email" placeholder="Enter your email" required />
                <br />
                <label> Password : </label>
                <input type="password" name="password" placeholder="Enter your password" required />
                <br />
                <button type="submit" className="btn-primary "> Login </button>
            </form>
        </div>
    )
}

export default LoginPage;