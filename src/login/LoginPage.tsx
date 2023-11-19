import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = Auth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Tutaj możesz umieścić logikę uwierzytelniania lub przekierowanie do innej strony po zalogowaniu.
    try {
      await signIn(email, password);
      navigate('/dashboard');
    }
    catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Logowanie</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Hasło</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Zaloguj
                </button>
                <h6>Chcesz się zarejestrować? </h6> <button type="submit" onClick={(e) => { navigate('/register') }}>Rejestracja</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
