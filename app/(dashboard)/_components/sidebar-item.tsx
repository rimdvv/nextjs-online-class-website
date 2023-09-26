'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === href ||
    (pathname === '/' && href === '/') ||
    pathname?.startsWith(`{href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        'flex items-center w-full pl-6 text-slate-400 font-medium text-sm transition-all hover:text-slate-600 hover:bg-[#F8F9FC]',
        isActive &&
          'text-[#6C47FF] bg-[#F8F9FC] border-r-2 border-r-[#6C47FF] hover:text-[#6C47FF] hover:bg-[#F8F9FC]'
      )}
    >
      <div className='flex items-center justify-center gap-4 py-4'>
        <Icon
          size={20}
          className={cn('text-slate-400', isActive && 'text-[#6C47FF]')}
        />
        {label}
      </div>
    </button>
  );
};

export default SidebarItem;
