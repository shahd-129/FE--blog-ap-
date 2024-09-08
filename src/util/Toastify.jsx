import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify/dist/ReactToastify.css';
export default function toastify() {
   
    const notify = () =>  toast('Post Created SuccessFfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

 
 return (<>
 <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
  </>

  )

 
}
