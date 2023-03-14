import axios from "axios";
import {addArticles, addArticlesCount, setArticle, setLiked} from '../redux/articles'
import React from "react";
import {format} from "date-fns";
import {cutDescription} from '../utilities/format'
import { setStatus, goHome, setSubmit, setGoTo } from '../redux/status'

const baseUrl = 'https://blog.kata.academy';
const tagQuery = '';
const tag = tagQuery ? `&tag=${tagQuery}` : '';
const authorQuery = '';
const author = authorQuery ? `&author=${authorQuery}` : '';
const favQuery = '';
const favorited = favQuery ? `&favorited=${favQuery}` : '';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`,
})

const getArticleItems = (articles) => articles.map((article) => {
  return {
    slug: article.slug,
    headerTitle: cutDescription(article.title, 40),
    title: article.title,
    likes: article.favoritesCount,
    tags: article.tagList,
    description: article.description,
    username: article.author.username, 
    updatedDate: format(new Date(article.updatedAt), "MMMM d, yyyy"),
    avatarPath: article.author.image,
    text: article.body,
    liked: article.favorited,
  };
});

const getArticleItem = (article) => {
  return {
    slug: article.slug,
    title: article.title,
    // headerTitle: cutDescription(article.title, 40),
    headerTitle: cutDescription(article.title, 40),
    likes: article.favoritesCount,
    tags: article.tagList,
    text: article.body,
    description: article.description,
    username: article.author.username,
    updatedDate: format(new Date(article.updatedAt), "MMMM d, yyyy"),
    avatarPath: article.author.image,
    liked: article.favorited,
  };
};


export const fetchArticles = (page, limit, token = '') => async (dispatch) => {
  axios(`${baseUrl}/api/articles?${tag}${author}${favorited}&limit=${limit}&offset=${(page - 1) * limit}`, {headers: getHeaders(token)})
  .then((res) => res.data)
    .then((data) => {
      if (data.articles.length !== 0) {
        // dispatch(setLoading(false))
        dispatch(addArticles(getArticleItems(data.articles)));
        dispatch(addArticlesCount(data.articlesCount));
      } else {
        console.log('что такое')
      }
    })
    .catch((err) => {
      console.log("err Code>", err.code, err);
    });
};


export const fetchArticle = (slug) => async (dispatch) => {
  axios(`${baseUrl}/api/articles/${slug}`)
    .then((res) => res.data)
    .then((data) => {
      console.log(data.article)
      // console.log(data.article)
      dispatch(setArticle(getArticleItem(data.article)));
    //   сверху было getArticleItem, я добавила s -- нужно его удалить, если что
    });
}; 


export const editArticle = (data, tags, token, slug) => async (dispatch) => {
  // const article = JSON.stringify({ article: { ...data, tagList: tags } })
  const {title, description, text: body} = data
  const article = JSON.stringify({ article: { 
    title,
    description,
    body,
    tagList: tags } 
  })
  console.log(article)
  return axios({
    url: slug ? `${baseUrl}/api/articles/${slug}` : `${baseUrl}/api/articles`,
    method: slug ? 'put' : 'post',
    headers: getHeaders(token),
    data: article,
  })
    .then((res) => {
      dispatch(setStatus('ok'))
      dispatch(setGoTo(res.data.article.slug))
      dispatch(setSubmit(true))
    })
    .catch(() => {
      dispatch(setSubmit(true))
      dispatch(setStatus('error'))
    })
}

export const deleteArticle = (token, slug) => async (dispatch) =>
  axios({
    url: `${baseUrl}/api/articles/${slug}`,
    method: 'delete',
    headers: getHeaders(token),
  })
    .then((res) => res.data)
    .then(() => {
      dispatch(setStatus('ok'))
      dispatch(goHome(true))
      dispatch(setSubmit(true))
    })
    .catch(() => {
      dispatch(setSubmit(true))
      dispatch(setStatus('error'))
    })

export const setLike = (token, slug, liked) => async (dispatch) =>
  axios({
    url: `${baseUrl}/api/articles/${slug}/favorite`,
    method: liked ? 'delete' : 'post',
    headers: getHeaders(token),
  })
    .then((res) => {
      dispatch(setStatus('ok'))
      dispatch(setLiked(getArticleItem(res.data.article)))
    })
    .catch(() => {
      dispatch(setSubmit(true))
      dispatch(setStatus('error'))
    })

