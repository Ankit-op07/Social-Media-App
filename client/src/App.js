import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navibar from './components/Navibar';
import CreatePost from './components/CreatePost';
import {reducer,initialState} from './reducers/userReducer';
import UserProfile from './components/UserProfile';
export const UserContext = createContext();

const Routing = ()=>{
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
const user=JSON.parse(localStorage.getItem('user'));

if(user){
  // navigate('./')
  dispatch({type:"USER",payload:user})
}else{
  navigate('./signin')
}
  },[])
  return (
    <Routes>
    <Route path="/" exact 
   element={ <Home/>}>
   </Route>
   <Route path="/signin"
    element={<Signin/>}>

   </Route>
   <Route path="/signup"
   element={<Signup/>}>
   </Route>
   <Route exact path="/profile"
   element={<Profile/>}>
   </Route>
   <Route path="/createpost"
   element={<CreatePost/>}>
   </Route>
   <Route path="/profile/:userid"
   element={<UserProfile/>}>
   </Route>
   </Routes>
  )
}


function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    
      <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
     <Navibar/>
     <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    
    
  );
}

export default App;
