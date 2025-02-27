interface tags{
    tags : string[]
}

const Tags = ( {tags}:tags) => {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium"
          >
            #{tag.trim()}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Tags
