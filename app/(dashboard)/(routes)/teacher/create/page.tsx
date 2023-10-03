'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/courses', values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success('Course created');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='max-w-5xl mx-auto flex flex-col h-full p-6 md:items-start md:justify-start'>
      <div>
        <h1 className='text-xl'>Name your course</h1>
        <p className='text-sm text-slate-500'>
          What would you like to name your course? Don&apos;t worry you can
          change this later.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder='e.g. "Next.js 101"'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the title of your course name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2'>
            <Link href='/'>
              <Button type='button' variant='ghost'>
                Cancel
              </Button>
            </Link>
            <Button type='submit' disabled={!isValid || isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
