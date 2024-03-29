import * as React from 'react';

import Navbar from '../navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const nDate = new Date();
  return (
    <main>
      <section style={{ backgroundColor: '#26282C' }}>
        <Navbar />
        {children}
        <footer
          className='flex h-16 w-screen items-center justify-end px-5'
          style={{ backgroundColor: '#121417' }}
        >
          <p className='text-sm font-light text-neutral-400'>
            © Copyright {nDate.getFullYear()}, yagiziskirik
          </p>
        </footer>
      </section>
    </main>
  );
}
