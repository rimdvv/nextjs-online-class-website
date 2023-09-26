import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import Sidebar from './sidebar';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        aria-controls='radix-:R1arbdj9:'
        className='ml-2 hover:opacity-70 transition md:hidden'
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 w-80'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
