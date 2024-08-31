import { useState, useEffect } from 'react';
import VideoList from './VideoList';
import { useParams } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';
// import { MdOutlineOndemandVideo } from "react-icons/md";

const Home = () => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchVideos = async (url) => {
    setLoading(true); 
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setVideos(result.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (query) {
      fetchVideos(`https://youtube-v31.p.rapidapi.com/search?q=${query}&part=snippet&type=video&maxResults=50`);
    } else {
      fetchVideos('https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50');
    }
  }, [query]);

  return (
    <div>
      {/* <h1 className="text-2xl mb-4 flex justify-center items-center"><MdOutlineOndemandVideo/></h1> */}

      {loading ? (
        
        <div className="flex justify-center items-center h-screen">
          <Vortex
            visible={true}
            height="180"
            width="180"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        </div>
      ) : (
        
        <VideoList videos={videos} />
      )}
    </div>
  );
};

export default Home;
