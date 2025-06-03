import './checkin.css'

function CheckinPage() {
  return (
      <div className="background">
        <div className="checkin-container">
          <div className="checkin-card">
            <form className="checkin-form">
              <img
                src="/assets/bordersw.jpg"
                alt="school"
                className="checkin-school-picture"
              />
              <h1 className="title">เข้าสู่ระบบ</h1>
              <label htmlFor="username" className="checkin-label">Username:</label>
              <input type="text" id="username" name="username" className="checkin-input" required />

              <label htmlFor="password" className="checkin-label">Password:</label>
              <input type="password" id="password" name="password" className="checkin-input" required />

              <button type="submit" className="checkin-button">เข้าสู่ระบบ</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default CheckinPage
