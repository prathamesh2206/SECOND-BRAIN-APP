import Logo from "../icons/Logo"
import TwitterIcons from "../icons/TwitterIcons"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"

const SideBar = () => {
  return (
    <div className="h-screen bg-white border-r-2 w-72   absolute  letft-0 top-0 pl-6">
      <div className="flex text-2xl font-bold pt-8">
        <div className=" pr-4 text-purple-600">
        <Logo/></div>
        Brainly
      </div>
   <div className=" pt-8 pl-4 "> 
      <SidebarItem title="twitter" startIcon={<TwitterIcons />}/>
      <SidebarItem title="youtube" startIcon={<YoutubeIcon/>}/> 
</div>  
    </div>
  )
}

export default SideBar