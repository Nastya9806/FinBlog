// // import classes from '*.module.css'
// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Header from '../header/header'
// import ListArticle from '../list-article/list-article'
// import classes from './app.module.scss'
// // import Rating from '@mui/material/Rating';
// import ArticlesList from '../list-article/list-article';
// // import { Layout, Space } from 'antd';
// // const { Header, Footer, Sider, Content } = Layout;

// function App() {
//     // return (
//     //   <Routes>
//     //     <Route path="/" element={<Header />}>
//     //       <Route index element={<Home />} />
//     //       <Route path="/articles" element={<ListArticle />} />
//     //       <Route path="/articles/:slug" element={<ArticlePage />} />
//     //       <Route path="/sign-up" element={<SignUp />} />
//     //       <Route path="/sign-in" element={<SignIn />} />
//     //       <Route path="/profile" element={<SignIn />} />
//     //       /profile
//     //     </Route>
//     //   </Routes>
//     // )
//     return(
//         <div className={classes.wrapper}>
//             <Header />
//             <ArticlesList />
//             </div>
//     )
//   }
// export default App

import React from 'react';
import { Container } from '@mui/material';
import Header from '../header/header';
import ArticleList from '../list-article/list-article';
import classes from './app.module.scss';

const App = () => {

  return (
    <div className={classes.app}>
      <Header />
      <Container className={classes.main} sx={{ mt: '80px' }}>
      <ArticleList />
    </Container>
      {/* <Main /> */}
    </div>
  );
};

export default App;