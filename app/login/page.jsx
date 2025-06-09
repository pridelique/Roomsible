import './login.css'
import Nav from "./components/Nav";

function LoginPage() {
  return (
      <div className="login-container">
        <div className="login-card">
          <form className="login-form">
            <img
              src="/assets/bordersw.jpg"
              alt="school"
              className="login-school-picture"
            />
            <h1 className="title">เข้าสู่ระบบ</h1>
            <label htmlFor="username" className="login-label">Username:</label>
            <input type="text" id="username" name="username" className="login-input" required />

            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" id="password" name="password" className="login-input" required />

            <button type="submit" className="login-button">เข้าสู่ระบบ</button>
          </form>
        </div>
      </div>
  )
}

export default LoginPage

