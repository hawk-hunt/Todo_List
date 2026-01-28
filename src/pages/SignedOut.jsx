import { Link } from 'react-router-dom'

export default function SignedOut(){
  return (
    <div className="card card-centered">
      <h3>Signed out</h3>
      <p className="muted">You've been signed out. Come back soon!</p>
      <div className="flex-gap-8 mt-12">
        <Link to="/login">Sign in</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}
