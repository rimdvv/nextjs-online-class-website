'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import formatPrice from '@/lib/formatprice';

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  return (
    <Button disabled size='sm' className='w-full md:w-auto'>
      Enroll for {formatPrice(price)}
    </Button>
  );
};
