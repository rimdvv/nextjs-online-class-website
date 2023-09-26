import Navbar from './_components/navbar';
import Sidebar from './_components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='h-20 md:ml-56 fixed z-50 inset-x-0'>
        <Navbar />
      </div>
      <div className='hidden md:flex flex-col h-full w-56 z-50 inset-y-0 fixed'>
        <Sidebar />
      </div>
      <div className='md:ml-56 h-full'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
