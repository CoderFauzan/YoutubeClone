import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const url = `https://youtube-v31.p.rapidapi.com/videos?part=snippet,statistics&id=${id}`;
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
        setVideo(result.items[0]);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      const commentsUrl = `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${id}&maxResults=10`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
        },
      };
      try {
        const response = await fetch(commentsUrl, options);
        const result = await response.json();
        setComments(result.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideoDetails();
    fetchComments();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-4">
      {/* Video Player */}
      {video?.id && (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
          allowFullScreen
          title={video.snippet.title}
        ></iframe>
      )}

      {/* Video Title and Views */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video?.snippet?.title}</h1>
        <p className="text-gray-600">{video?.statistics?.viewCount} views</p>
      </div>

      {/* Drop-down for Description */}
      <div className="mt-4">
        <button
          className="text-blue-500"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? 'Hide Description' : 'Show Description'}
        </button>
        {showDescription && (
          <p className="mt-2 text-gray-800">{video?.snippet?.description}</p>
        )}
      </div>

      {/* Likes and Dislikes */}
      <div className="flex items-center mt-4 space-x-4">
        <div className="flex items-center space-x-1">
          <FaThumbsUp className="text-blue-500" />
          <span>{video?.statistics?.likeCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaThumbsDown className="text-red-500" />
          <span>Dislikes</span>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <p className="font-bold">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </p>
                <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
