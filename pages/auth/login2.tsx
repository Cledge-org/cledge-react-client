// my accounts page
import Link from "next/link";
import {Dispatch, SetStateAction, useState} from 'react';
import { getProviders, signIn } from "next-auth/react"
import type {Provider} from 'next-auth/providers';

export default function login({providers}:{providers: Provider}) {
  var [formData, setFormData]= useState({
    email : "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="container">
      <div className="col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-items-center">
        <div className="fs-1 fw-bold cl-darktext">Sign in</div>
        { 
          Object.values(providers).map((provider) => (        
          <div key={provider.name} className='w-100'>          
            <button className='btn btn-light cl-btn shadow-sm my-3 w-100 fw-bold' onClick={() => signIn(provider.id)}>            
            Sign in with {provider.name}          
            </button>        
            </div>      
            )
          )
        }
        
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {  
  const providers = await getProviders()  
  return {    
    props: { providers },  
  }
}