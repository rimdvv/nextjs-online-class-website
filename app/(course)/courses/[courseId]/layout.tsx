import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getProgress } from '@/actions/get-progress';

import { CourseSidebar } from './_components/course-sidebar';
import { NavbarRoutes } from '@/components/navbar-routes';

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!course) {
    return redirect('/');
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className='h-full'>
      <div className='h-[80px] md:pl-80 fixed inset-y-0 w-full z-50'>
        <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
          <NavbarRoutes />
        </div>
      </div>
      <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className='md:pl-80 pt-[80px] h-full'>{children}</main>
    </div>
  );
};

export default CourseLayout;
