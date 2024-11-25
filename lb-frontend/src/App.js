import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Article from './pages/Articles';
import ArticleCreate from './pages/create/ArticleCreation';
import Footer from './components/footer/footer';
import ArticleSingle from './pages/single/SingleArticle';

function App() {
  return (
    <div className='App'>
      <div className="main-content">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Article />} />
            <Route path='/create' element={<ArticleCreate />} />
            <Route path='/article' element={<ArticleSingle />} />
          </Routes>
        </BrowserRouter >
      </div>
      <Footer className='footer' />
    </div>



  );
}

export default App;
