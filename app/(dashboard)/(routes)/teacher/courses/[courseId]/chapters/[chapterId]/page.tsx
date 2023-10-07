import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Link from 'next/link';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import { IconBadge } from '@/components/icon-badge';
import ChapterTitleForm from './_components/chapter-title-form';
import ChapterDescriptionForm from './_components/chapter-description-form';
import ChapterAccessForm from './_components/chapter-access-form';
import ChapterVideoForm from './_components/chapter-video-form';
import { Banner } from '@/components/banner';
import { ChapterActions } from './_components/chapter-actions';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner variant='warning' label='This chapter is unpublished' />
      )}
      <div className='p-6'>
        <div>
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className='flex items-center transition hover:opacity-75 mb-6'
          >
            <ArrowLeft className='mr-2' />
            Go back
          </Link>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-medium'>Chapter Setup</h1>
              <span className='text-slate-700'>
                Complete all fields {completionText}
              </span>
            </div>
            <ChapterActions
              disabled={!isComplete}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
          </div>

          <div className='grid mt-16 grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-6'>
              <div>
                <div className='flex items-center gap-2'>
                  <IconBadge icon={LayoutDashboard} />
                  <h1 className='text-xl'>Customize your chapter</h1>
                </div>
                <ChapterTitleForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
                <ChapterDescriptionForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <IconBadge icon={Eye} />
                  <h1 className='text-xl'>Access Settings</h1>
                </div>
                <ChapterAccessForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
            <div className='space-y-6'>
              <div>
                <div className='flex items-center gap-2'>
                  <IconBadge icon={Video} />
                  <h1 className='text-xl'>Add video</h1>
                </div>
                <ChapterVideoForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
