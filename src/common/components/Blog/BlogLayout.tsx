import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-fuchsia-100 py-3'>
        <div className='container mx-auto flex justify-center'>
          <Link href='javascript:history.back()'>
            <a>Back</a>
          </Link>
        </div>
      </header>
      <main className='container mx-auto flex-1'>{children}</main>
      <footer className='bg-fuchsia-100 mt-8 py-4'>
        <div className='container mx-auto flex justify-center'>
          &copy; 2022 Cledge
        </div>
      </footer>
    </div>
  );
}
