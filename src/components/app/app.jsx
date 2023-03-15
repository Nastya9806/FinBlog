import React from 'react';
import { Route, Routes } from 'react-router-dom'
import ArticleList from '../../pages/list-article';
// import classes from './app.module.scss';
import Layout from '../layout/layout'
import SingleArticle from '../../pages/single-article';
import SignIn from '../sign-in-form/sign-in'
import SignUp from '../sign-up-form/sign-up'
import ArticleForm from '../../pages/article-form'
import EditProfile from '../edit-profile/edit-profile'
import UserForm from '../../pages/user-form'

const App = () => {
  return ( 
    <div > 
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
    </Route>
    </Routes>
    </div>
  );
};

export default App;