import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card  from "../components/Card"
import CreateContentModal from "../components/CreateContentModal"
import PlusIcon from "../icons/PlusIcon"
import ShareIcon from "../icons/ShareIcon"
import "../index.css"
import SideBar from "../components/Sidebar"
import { useContent } from "../hooks/getContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import ShareModal from "../components/SharreModal"
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


function Dashboard() {
 const [modalOpen,setModalOpen]= useState(false);
 const {content , fetchContent}   = useContent();
 const [shareModalOpen,setShareModalOpen]= useState(false);
 useEffect(() => {
  fetchContent();
 } ,
  [ modalOpen,fetchContent]);
   async function handleDelete(id:string){
    const response = await axios.delete(`${BACKEND_URL}/content/${id}`,{
      headers:{
        Authorization: `${localStorage.getItem("Authorization")}`
      }
    })
    if(response.status === 200){
      fetchContent();
     return ;
    }
    else {
      console.log(response)
    }

  }
  return (
    
    <div className="flex min-h-screen bg-gray-50">
      <SideBar/>
      <div className="flex-1 p-6 ml-72">
        <CreateContentModal open={modalOpen} onClose={()=>{
              setModalOpen(false)
        }}/>
        <div >
          <ShareModal open={shareModalOpen} onClose={()=>{
             setShareModalOpen(false)}}/>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">My Content</h1>
          <div className="flex gap-4">
            {/* nav */}
            <Button onClick={()=>{ setModalOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
            <Button onClick={()=>{ setShareModalOpen(true) }} variant="secondary" text="Share Brain"  startIcon={<ShareIcon/>}/>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
          {/* map the data */}
          {/* @ts-ignore */}
          { content.length ===0 ? <div className="text-center text-gray-500">No content found</div> : content.map(({title ,link,type,tags,_id}:Content)=>(
            <Card key={_id} title={title} link={link} onDelete={() => handleDelete(_id as string)} type={type} tags={tags  }/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard