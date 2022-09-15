import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      < className='py-3'>
        <div className='container mx-auto'>
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link href='/blogs'>
            <a> Back</a>
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
