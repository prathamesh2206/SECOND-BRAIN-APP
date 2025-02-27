import { useState } from "react"
import Button from "../components/Button"
import Card  from "../components/Card"
import CreateContentModal from "../components/CreateContentModal"
import PlusIcon from "../icons/PlusIcon"
import ShareIcon from "../icons/ShareIcon"
import "../index.css"
import SideBar from "../components/Sidebar"

function Dashboard() {
 const [modalOpen,setModalOpen]= useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar/>
      <div className="flex-1 p-6 ml-72">
        <CreateContentModal open={modalOpen} onClose={()=>{
 setModalOpen(false)
        }}/>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">My Content</h1>
          <div className="flex gap-4">
            {/* nav */}
            <Button onClick={()=>{ setModalOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
            <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
          {/* map the data */}
          <Card title="First Tweet" link="https://x.com/abhwshek/status/1891038378063442246" type="twitter" tags={["tag1", "tag2", "tag3"]}/>
          <Card title="First Video" link="https://www.youtube.com/watch?v=hYip_Vuv8J0" type="youtube" tags={["tag1", "tag2", "tag3"]} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard