'use client';

import axios from 'axios';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='bg-slate-100 border rounded-md p-4 mt-6'>
      <div className='flex items-center justify-between font-medium'>
        Course Image
        <Button variant='ghost' onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className='flex items-center justify-center rounded-md bg-slate-200 h-60'>
            <ImageIcon className='text-slate-400 h-8 w-8' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              className='object-cover rounded-md'
              fill
              alt='upload'
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint='courseImage'
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className='text-xs text-slate-400 mt-4'>
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
