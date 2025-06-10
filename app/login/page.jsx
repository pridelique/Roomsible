import './login.css'
import Image from 'next/image'

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <form className="login-form">
          <Image
            src="/satriwitpic.jpg"
            alt="school"
            width={500}
            height={300}
            className="login-school-picture"
          />
          <h1 className="title">เข้าสู่ระบบ</h1>
          <label htmlFor="username" className="login-label">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            className="login-input"
            placeholder=" 👤 Type your username"
            required
          />
          <br />
          <label htmlFor="password" className="login-label">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="login-input"
            placeholder=" 🔒 Type your password"
            required
          />
          <br />
          <button type="submit" className="login-button">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

