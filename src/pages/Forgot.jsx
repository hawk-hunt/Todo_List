import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset, isRateLimited } from '../lib/auth'

export default function Forgot(){
  const [email,setEmail]=useState('')
  const [sent,setSent]=useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function handle(e){
    e.preventDefault()
    if(isRateLimited(`forgot_${email}`, 6, 60*60*1000)){
      setSent(true)
      return
    }
    
    setLoading(true)
    setErr('')
    
    try {
      await requestPasswordReset(email)
      setSent(true)
    } catch (error) {
      setErr('Failed to request password reset. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card auth-card">
      <h3>Reset your password</h3>
      <p className="muted small">Enter your email and we'll send a secure reset link.</p>
      {!sent ? (
        <form onSubmit={handle}>
          <div className="form-row">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>
          {err && <div className="muted mt-8">{err}</div>}
        </form>
      ) : (
        <div>
          <p className="muted">If an account exists for this email, you'll receive a reset link shortly.</p>
          <div style={{marginTop:12}}><Link to="/login">Back to login</Link></div>
        </div>
      )}
    </div>
  )
}
