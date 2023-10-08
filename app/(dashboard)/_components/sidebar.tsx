import Logo from './logo';
import SidebarRoutes from './sidebar-routes';

const Sidebar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='flex p-4 items-center gap-4 h-20'>
        <Logo />
        <p className='font-semibold text-lg text-[#1a2849]'>Online Class</p>
      </div>
      <div>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
