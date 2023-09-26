import MobileSidebar from './mobile-sidebar';

const Navbar = () => {
  return (
    <div className='p-4 flex items-center border-b shadow-sm bg-white h-full'>
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
