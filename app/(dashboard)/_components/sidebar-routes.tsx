'use client';

import { BarChart, Compass, Layout, List } from 'lucide-react';
import SidebarItem from './sidebar-item';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  {
    icon: Compass,
    label: 'Browse',
    href: '/',
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
