import { createSlice } from '@reduxjs/toolkit'

const articlesSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    article: {},
    articlesCount: 0,
    currPage: 1,
    limit: 5,
    loadingData: '',
  },

  reducers: {
    addArticles(state, action) {
      state.articles = action.payload
    },
    setLoading(state, action) {
      state.loadingData = action.payload
    },
    addArticlesCount(state, action) {
      state.articlesCount = action.payload
    },
    setPage(state, action) {
      state.currPage = action.payload
    },
    setArticle(state, action) {
      state.article = action.payload
    },
    setLiked(state, action) {
      state.articles = state.articles.map((art) => (art.slug === action.payload.slug ? action.payload : art))
    },
  },
})

export default articlesSlice.reducer
export const { addArticles, addArticlesCount, setPage, setLimit, setArticle, setLoading, setLiked } =
  articlesSlice.actions
