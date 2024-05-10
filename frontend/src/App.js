import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/*import all components*/
import Login from './components/Login' ;
import Register from './components/Register';
import Reset from './components/Reset';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import Users from './components/Users';
import Email from './components/Email';

/**auth middleware */
import { AuthorizeUser } from './middleware/auth'


/*root routes */
const router = createBrowserRouter([
  {
    path : '/login',
    element : <Login></Login>
  },
  {
    path : '/register',
    element : <Register></Register>
  },
  {
    path : '/profile',
    element : <AuthorizeUser> <Profile></Profile></AuthorizeUser>
  },
  {
    path : '/reset/:token',
    element : <Reset></Reset>
  },
  {
    path : '*',
    element : <PageNotFound></PageNotFound>
  },
  {
    path : '/',
    element : <Home></Home>
  },
  {
    path : '/users',
    element : <Users></Users>
  },
  {
    path : '/email',
    element : <Email></Email>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
