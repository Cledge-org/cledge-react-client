import { useSession ,signIn, signOut} from 'next-auth/react';
import Link from 'next/link'

export default function Header({}){
    const { data: session, status } = useSession();


    return (
        <nav className='navbar cl-blue sticky-top navbar-expand-md bg-white px-3'>
            <div className="container-fluid">
            <Link href="/">
                <a className='navbar-brand mx-4'>cledge</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="fs-7 collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                {
                    status === 'authenticated' ? 

                    <div className="navbar-nav">
                        <Link href="/resources">
                            <a className="nav-link">Resources</a>
                        </Link>
                        <Link href="/progress">
                            <a className="nav-link">Progress</a>
                        </Link>
                        <Link href="/account">
                            <a className="nav-link ">My Account</a>
                        </Link>
                        <Link href="/api/auth/signout">
                            <a className="nav-link" href="">Logout</a>
                        </Link>
                    </div>
                    :
                    <Link href="/api/auth/signin">
                        <a className="nav-link" href="">Log In</a>
                    </Link>
                }

                </div>
            </div>
    
            
        </nav>
    );
}