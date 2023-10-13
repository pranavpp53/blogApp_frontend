import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Write from './components/writePost/Write';
import Userposts from './components/MyPosts/Userposts';
import View from './components/View/View';
import Edit from './components/Edit/Edit';
import Singleblog from './components/SingleBlog/Singleblog';




function App() {
  return (
    <>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/write' element={<Write></Write>}></Route>
        <Route path='/myposts' element={<Userposts></Userposts>}></Route>
        <Route path='/view/:id' element={<View></View>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        <Route path='/singleblog/:id' element={<Singleblog></Singleblog>}></Route>
      </Routes>
    </>
  );
}

export default App;
