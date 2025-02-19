import ShareIcon from "../icons/ShareIcon";
interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

const Card = ({ title, link, type }: CardProps) => {
  return (
    <div className="transition-transform hover:scale-[1.02] duration-200">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-gray-500 hover:text-purple-500 transition-colors">
                <ShareIcon />
              </div>
              <span className="ml-2 font-medium text-gray-700">{title}</span>
            </div>

            <div className="flex gap-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <ShareIcon />
              </a>
              <button className="text-gray-400 hover:text-purple-500 transition-colors">
                <ShareIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {type === "youtube" && (
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-md"
                src={link.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
