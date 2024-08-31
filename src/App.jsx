import  { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaHome} from 'react-icons/fa';
import { SiYoutubestudio } from "react-icons/si";
import Home from './components/Home';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-red-500 text-white">
       
        <Link to="/" className="flex items-center">
          <SiYoutubestudio className="text-3xl" />
          <span className="ml-2 text-xl font-bold">CloneTube</span>
        </Link>

        <form onSubmit={handleSearch} className="flex">
          <input 
            type="text" 
            className="p-2 rounded-l-lg text-black"
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button className="p-2 bg-blue-600 rounded-r-lg">Search</button>
        </form>

       
        <Link to="/" className="flex items-center">
          <FaHome className="text-2xl mr-2" />
          <span>Home</span>
        </Link>
      </header>
      
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/search/:query" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
