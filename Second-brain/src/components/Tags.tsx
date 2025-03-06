interface TagsProps {
  tags: { 
    _id?: string; 
    title: string; 
  }[];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={tag._id || index}
            className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium"
          >
            #{tag.title.trim()}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Tags;