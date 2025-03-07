import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import { BACKEND_URL } from "../config";
import "../index.css";
import { Link } from "react-router-dom";

interface Content {
  _id?: string;
  title: string;
  link: string;
  type: "Youtube" | "Twitter";
  tags: {
    _id?: string;
    title: string;
  }[];
  userId?: {
    _id: string;
    username: string;
  };
}

// Simple sidebar for the shared brain view
const BrainSidebar = ({ username }: { username: string }) => {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-white shadow-md overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {username ? `${username}'s Brain` : "Shared Brain"}
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md px-3 py-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="#content" 
                  className="flex items-center text-indigo-600 bg-indigo-50 rounded-md px-3 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Shared Content
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-sm text-gray-600">
              This is a collection of content shared by {username || "a user"}. Browse through their curated links and resources.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Brain Share
        </p>
      </div>
    </div>
  );
};

function Brain() {
  const { hash } = useParams();
  const [content, setContent] = useState<Content[]>([]);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/brain/${hash}`);
        
        if (response.status === 200 && response.data.data) {
          setContent(response.data.data);
          
          if (response.data.data.length > 0 && response.data.data[0].userId?.username) {
            setUsername(response.data.data[0].userId.username);
          }
        }
      } catch (err) {
        console.error("Error fetching shared content:", err);
        setError("Failed to load shared content. The link may be invalid or expired.");
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedContent();
    }
  }, [hash]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrainSidebar username={username} />
      
      <div className="flex-1 p-6 ml-64" id="content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            {username ? `${username}'s Collection` : "Shared Collection"}
          </h1>
          <p className="text-gray-600 mt-2">
            Explore {username ? `${username}'s` : "these"} curated links and resources
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gray-600">Loading shared content...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Content Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
            {content.length === 0 ? (
              <div className="text-center text-gray-500 col-span-full py-10">
                No content found in this shared brain
              </div>
            ) : (
              content.map(({ title, link, type, tags, _id }: Content) => (
                <Card 
                  key={_id} 
                  title={title} 
                  link={link} 
                  type={type} 
                  tags={tags} 
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Brain;