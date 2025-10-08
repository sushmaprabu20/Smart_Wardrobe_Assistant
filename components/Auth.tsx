import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await signup({ email, password });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/50 -z-10"
            style={{
            backgroundImage: 'radial-gradient(circle at 15% 15%, rgba(124, 58, 237, 0.2) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(79, 70, 229, 0.2) 0%, transparent 40%)'
            }}
        ></div>
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">AI Wardrobe Manager</h1>
                <p className="text-gray-400 mt-2">Your personal stylist, powered by AI.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-white mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            required
                             value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Spinner small/> : (isLogin ? 'Log In' : 'Sign Up')}
                        </button>
                    </div>
                </form>
                
                <div className="text-center mt-6">
                    <button onClick={toggleAuthMode} className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline">
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Auth;
