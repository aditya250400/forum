/* eslint-disable react/prop-types */
import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { IconCircleCheck } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import Markdown from './Markdown';

export default function CommentItems({ comment, thread, children }) {
  // destruct props
  const { auth } = usePage().props;

  // define useForm from inertia
  const { post } = useForm({
    _method: 'put'
  });

  // define method store
  const store = async (e) => {
    e.preventDefault();

    post(`/account/comments/${thread.id}/solution/${comment.id}`, {
      onSuccess: () => {
        toast.success('Komentar Terbaik Disimpan!', {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        });
      }
    });
  };

  return (
    <div
      className={`${thread.solved == comment.id ? 'border border-teal-500' : ''} bg-white rounded-lg`}>
      <div className="border-b px-6 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={comment.user.avatar} className="rounded-full w-8 h-8" />
            <span className="text-sm text-gray-900 font-semibold">{comment.user.username}</span>
          </div>
          <div className="flex items-center gap-2">{children}</div>
        </div>
      </div>
      <div className="px-6 py-4">
        <Markdown>{comment.content}</Markdown>
      </div>
      <div className="px-6 py-3 flex justify-end items-center gap-3">
        {thread.solved == comment.id && (
          <div className="flex items-center gap-1 text-sm bg-teal-500 text-white px-4 py-1 rounded-lg">
            <IconCircleCheck strokeWidth={'1.5'} className="w-5 h-5" /> Solution
          </div>
        )}
        {auth.user.id == thread.user.id && (
          <form onSubmit={store}>
            <button className="text-sm flex items-center gap-1 bg-sky-500 text-white px-3 py-1 rounded-lg">
              <IconCircleCheck strokeWidth={'1.5'} className="w-5 h-5" /> Mark as Solution
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
