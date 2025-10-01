function LoginPage(){
    return(
        <div>
            <form>
                <label> Email : </label>
                <input type="email" name="email" placeholder="Enter your email" required />
                <br />
                <label> Enter Password : </label>
                <input type="password" name="password" placeholder="Enter your password" required />
                <br />
                <button type="submit" className="btn-primary"> Login </button>
            </form>
        </div>
    )
}

export default LoginPage;