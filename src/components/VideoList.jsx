import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const VideoList = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* eslint-disable-next-line react/prop-types */}
      {videos && videos.length > 0 ? (
        // eslint-disable-next-line react/prop-types
        videos.map((video) => (
          <Link key={video?.id?.videoId} to={`/video/${video?.id?.videoId}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
             
              {video?.snippet?.thumbnails?.high?.url && (
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{video?.snippet?.title}</h3>
                <p className="text-gray-600">{video?.snippet?.channelTitle}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default VideoList;
