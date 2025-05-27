import { useEffect, useState } from 'react';
import ProductPage from './pages/ProductPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <ProductPage user={user} setUser={setUser} />
    </div>
  );
}

export default App;

