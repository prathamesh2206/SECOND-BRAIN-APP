import Logo from "../icons/Logo"
import TwitterIcons from "../icons/TwitterIcons"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"

const SideBar = () => {
  return (
    <div className="fixed h-screen bg-white border-r border-gray-200 w-72 left-0 top-0 shadow-sm">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center space-x-4">
          <div className="text-purple-600 transition-transform hover:scale-105">
            <Logo/>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Brainly</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 mt-2">
        <div className="space-y-1">
          <SidebarItem 
            title="Twitter" 
            startIcon={<TwitterIcons />}
            isActive={false}
          />
          <SidebarItem 
            title="YouTube" 
            startIcon={<YoutubeIcon/>}
            isActive={false}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-sm text-gray-500 text-center">
          © 2024 Brainly
        </div>
      </div>
    </div>
  )
}

export default SideBar