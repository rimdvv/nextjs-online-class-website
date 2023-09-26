import Sidebar from './_components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='hidden md:flex flex-col h-full w-56 z-50 inset-y-0 fixed'>
        <Sidebar />
      </div>
      <div className='md:ml-56 h-full'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
