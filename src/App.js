import logo from './logo.svg';
import './App.css';

import Home from './pages/Home'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const notifySuccess = (message) =>

    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const notifyError = (message) =>

    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (

    <main>

      <ToastContainer />

      <Home

        notifySuccess={notifySuccess}
        notifyError={notifyError}
        
      />


    </main>

  );
}

export default App;
