import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../lib/auth'

function validatePassword(p){
  const okLen = p.length >= 8
  const hasLetter = /[A-Za-z]/.test(p)
  const hasNumber = /[0-9]/.test(p)
  return okLen && hasLetter && hasNumber
}

export default function Reset(){
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const strength = (()=>{
    const v = (function(p){
      const okLen = p.length >= 8
      const hasLetter = /[A-Za-z]/.test(p)
      const hasNumber = /[0-9]/.test(p)
      return { ok: okLen && hasLetter && hasNumber, okLen, hasLetter, hasNumber }
    })(password)
    if(!password) return ''
    if(v.ok) return 'Strong'
    if(v.okLen && (v.hasLetter || v.hasNumber)) return 'Weak'
    return 'Very weak'
  })()

  async function handle(e){
    e.preventDefault()
    if(!validatePassword(password)) return setErr('Password does not meet requirements')
    if(password !== confirm) return setErr('Passwords do not match')
    
    setLoading(true)
    setErr('')

    try {
      await resetPassword(token, password)
      nav('/login')
    } catch (error) {
      setErr(error.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if(!token) return (
    <div className="card auth-card">
      <h3>Invalid link</h3>
      <p className="muted small">This reset link is invalid. Request a new one.</p>
      <Link to="/forgot">Request new link</Link>
    </div>
  )

  return (
    <div className="card auth-card">
      <h3>Create a new password</h3>
      <p className="muted small">Enter a new password to reset your account.</p>
      <form onSubmit={handle}>
        <div className="form-row">
          <label>New password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="new-password" />
          <div className="muted small">Minimum 8 characters, include letters and numbers. {strength && <span className="ml-8">Strength: {strength}</span>}</div>
        </div>
        <div className="form-row">
          <label>Confirm password</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </div>
        <div className="flex-gap-8">
          <button className="primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </div>
        {err && <div className="muted mt-8">{err}</div>}
      </form>
    </div>
  )
}
