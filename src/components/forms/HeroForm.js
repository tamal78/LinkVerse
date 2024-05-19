'use client';

import grabUsername from '@/actions/grabUsername';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HeroForm({ user, isAlreadyMade, pageUri }) {
  const router = useRouter();
  // useEffect(() => {
  //   if (
  //     'localStorage' in window &&
  //     window.localStorage.getItem('desiredUsername')
  //   ) {
  //     const username = window.localStorage.getItem('desiredUsername');
  //     window.localStorage.removeItem('desiredUsername');
  //     redirect('/account?desiredUsername=' + username);
  //   }
  // }, []);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector('input');
    const userName = input.value;
    if (userName.length > 0 || pageUri) {
      if (user) {
        await grabUsername({ userName });
        router.push('/account');
      } else {
        // window.localStorage.setItem('desiredUsername', username);
        await signIn('google', {
          callbackUrl: process.env.NEXT_PUBLIC_URL + '/account'
        });
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='inline-flex items-center shadow-lg bg-white shadow-gray-500/20'
    >
      <span className='bg-white py-4 pl-4'>
        linkverce.to/{isAlreadyMade ? pageUri : ''}
      </span>
      <input
        type='text'
        className=''
        style={{ backgroundColor: 'white', marginBottom: 0, paddingLeft: 0 }}
        placeholder={isAlreadyMade ? '' : 'username'}
        disabled={isAlreadyMade}
      />
      <button
        type='submit'
        className='bg-blue-500 text-white py-4 px-6 whitespace-nowrap'
      >
        {isAlreadyMade ? 'Go To Dashboard' : 'Join for free'}
      </button>
    </form>
  );
}
