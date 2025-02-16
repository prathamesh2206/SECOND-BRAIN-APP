import { useState } from "react"
import Button from "./components/Button"
import Card from "./components/Card"
import CreateContentModal from "./components/CreateContentModal"
import PlusIcon from "./icons/PlusIcon"
import ShareIcon from "./icons/ShareIcon"
import "./index.css"
function App() {
 const [modalOpen,setModalOpen]= useState(false);

  return (
    <div className=" p-4">
      <CreateContentModal open={modalOpen} onClose={()=>{
 setModalOpen(false)
      }}/>
      <div className="flex justify-end gap-4">
      <Button onClick={()=>{ setModalOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
     </div>
      <div className="flex gap-4  ">
      <Card title="first tweet" link="https://x.com/abhwshek/status/1891038378063442246" type="twitter"/>
      <Card title="first video" link="https://www.youtube.com/watch?v=hYip_Vuv8J0" type="youtube"/>
      </div>
      </div>
      
  )
}

export default App
