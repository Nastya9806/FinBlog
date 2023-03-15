import axios from "axios";
import {addArticles, addArticlesCount, setArticle, setLoading, setLiked} from '../redux/articles'
import React from "react";
import {format} from "date-fns";
import {cutDescription} from '../utilities/format'
import { setStatus, goHome, setSubmit, setGoTo } from '../redux/status'

const baseUrl = 'https://blog.kata.academy';
// const tagQuery = '';
const tag = '' ? `&tag=${''}` : '';
const authorQuery = '';
const author = authorQuery ? `&author=${authorQuery}` : '';
const favQuery = '';
const favorited = favQuery ? `&favorited=${favQuery}` : '';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`,
})

const getArticleItems = (articles) => articles.map((article) => {
  console.log(article)
 return getArticleItem(article)

});

const getArticleItem = (article) => {
  return {
    slug: article.slug,
    title: article.title,
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
        dispatch(setLoading('done'))
        // dispatch(setStatus('ok'))
        dispatch(addArticles(getArticleItems(data.articles)));
        dispatch(addArticlesCount(data.articlesCount));
      } else {
        console.log('что такое')
      }
    })
    .catch((err) => {
      dispatch(setLoading('error'))
    });
};


export const fetchArticle = (slug) => async (dispatch) => {
  axios(`${baseUrl}/api/articles/${slug}`)
    .then((res) => res.data)
    .then((data) => {
      dispatch(setLoading('done'))
      dispatch(setArticle(getArticleItem(data.article)));
    }).catch(() => {
      dispatch(setLoading('error'))
    })
}; 


export const editArticle = (data, tags, token, slug) => async (dispatch) => {
  const {title, description, text: body} = data
  const article = JSON.stringify({ article: { 
    title,
    description,
    body,
    tagList: tags 
  } 
  })
  return axios({
    url: slug ? `${baseUrl}/api/articles/${slug}` : `${baseUrl}/api/articles`,
    method: slug ? 'put' : 'post',
    headers: getHeaders(token),
    data: article,
  })
    .then(() => {
      dispatch(setLoading('done'))
    })
    .catch(() => {
      dispatch(setLoading('error'))
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
      dispatch(setLoading('done'))
    })
    .catch(() => {
      dispatch(setLoading('error'))
    })

export const setLike = (token, slug, liked) => async (dispatch) =>
  axios({
    url: `${baseUrl}/api/articles/${slug}/favorite`,
    method: liked ? 'delete' : 'post',
    headers: getHeaders(token),
  })
    .then((res) => {
      dispatch(setLoading('done'))
      dispatch(setLiked(getArticleItem(res.data.article)))
    })
    .catch(() => {
      dispatch(setLoading('error'))
      // dispatch(setStatus('error'))
    })

