import ShareIcon from "../icons/ShareIcon";
import Text from "../icons/Text";
import Trash from "../icons/Trash";
import Video from "../icons/Video";
import Tags from "./Tags";

interface CardProps {
  title: string;
  link: string;
  type: "Youtube" | "Twitter";
  tags: { _id?: string; title: string }[];
  onDelete?: () => Promise<void>;
}

const Card = ({onDelete, title, link, type, tags }: CardProps) => {
  return (
    <div className="transition-transform hover:scale-[1.02] duration-200 ">
      <div className="bg-white rounded-lg border border-gray-200  flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-1 min-w-0">
              <div className="text-gray-500 hover:text-purple-500 transition-colors flex-shrink-0">
               {type === "Youtube" ? <Video />: <Text/>}
              </div>
              <span className="ml-2 font-medium text-gray-700 truncate">{title}</span>
            </div>
            <div className="flex gap-2 flex-shrink-0 ml-2 justify-center items-center">
              <a
              
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <ShareIcon />
              </a>
              <button onClick={onDelete} className="text-gray-400 hover:text-purple-500 transition-colors">
                < Trash />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 h-full">
        {/* Content */}
            
        <div className="flex-1 p-2 relative">
          {type === "Youtube" && (
            <iframe
              className="w-full h-full rounded-md"
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "Twitter" && (
            <div className=""><blockquote className="twitter-tweet h-full overflow-y-auto ">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className="p-2 flex-shrink-0 flex items-center">
          <Tags tags={tags} />
        
        </div>
         </div>
      </div>
    </div>
  );
};

export default Card;