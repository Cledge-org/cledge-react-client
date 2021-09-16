// my accounts page
import Link from 'next/link';
export default function login (){
    return(
        <div className='container-fluid'>
            <div className="col w-md-25 d-md-flex mx-auto mt-5 flex-column justify-content-center align-items-center">
                <div className='fs-1 fw-bold cl-darktext'>
                    Sign in
                </div>
                <div className="form-group mt-3">
                    <label style={{fontSize: '0.9em'}} className='text-muted' htmlFor="email">Email address</label>
                    <input type="email" className="px-3 form-control" id="email" placeholder="Enter email"/>
                </div>

                <div className="form-group mt-3">
                    <label style={{fontSize: '0.9em'}} className='text-muted' htmlFor="password">Password</label>
                    <input type="password" className="px-3 form-control" id="password" placeholder="Enter Password"/>
                </div>

                <div className='row d-flex flex-row mt-4 justify-content-between align-items-center'>
                    <div className='col-auto px-0'>
                    <Link href="/auth/signup">
                        <a className="cl-blue">Create Account</a>
                    </Link>
                    </div>

                    <div className='col px-0'>
                    <button type="button" className='btn btn-primary rounded-'>
                        Log in
                    </button>
                    </div>

                </div>
            </div>
        </div>
    )
}