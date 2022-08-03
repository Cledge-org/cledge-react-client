import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className='py-3'>
        <div className='container mx-auto'>
          <Link href='javascript:history.back()'>
            <a>Back</a>
          </Link>
        </div>
      </header>
      <main className=''>{children}</main>
      <footer className='mt-8 py-4'>
        <div className='container'>
          &copy; 2022 Cledge
        </div>
      </footer>
    </div>
  );
}
