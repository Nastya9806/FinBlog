import React from 'react';
import { Route, Routes } from 'react-router-dom'
import ArticleList from '../../pages/list-article';
import Layout from '../layout/layout'
import SingleArticle from '../../pages/single-article';
import SignIn from '../../pages/sign-in'
import SignUp from '../../pages/sign-up'
import ArticleForm from '../../pages/article-form'
import EditProfile from '../user-form/user-form'
import ErrorDetected from '../../UI/error/error'

const App = () => {

  return ( 
    <div> 
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/new-article" element={<ArticleForm />} />
        <Route path="/profile" element={<EditProfile />} />
        {/* <Route path="/profile" element={<UserForm />} /> */}
        <Route path="/articles/:slug/edit" element={<ArticleForm />} />
        <Route path="*" element={<ErrorDetected/>} />
    </Route>
    </Routes>
    </div>
  );
};

export default App;