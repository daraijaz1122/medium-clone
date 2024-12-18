
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/dashboard' element={ < Blogs/>} />
          <Route path="/blog/:id" element={<Blog />} /> 
          <Route path="/publish" element={<CreateBlog />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
