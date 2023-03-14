import { createSlice } from '@reduxjs/toolkit'

const articlesSlice = createSlice({
    name: 'article',
    initialState: {
        articles: [],
        article: {},
        articlesCount: 0,
        currPage: 1,
        limit: 5,
        loading: true,
    },

    reducers: {
        addArticles(state, action) {
            state.articles = action.payload;
          },
        setLoading(state, action) {
          state.loading = action.payload;
        },
        addArticle(state, action) {
            state.articles = [action.payload]
        },
        addArticlesCount(state, action) {
            state.articlesCount = action.payload;
          },
        setPage(state, action) {
            state.currPage = action.payload;
          },
        setLimit(state, action) {
            state.limit = action.payload;
          },
        setArticle(state, action) {
            state.article = action.payload;
          },
        setLiked(state, action) {
            state.articles = state.articles.map((art) => (art.slug === action.payload.slug ? action.payload : art))
          },
    },
}
)

export default articlesSlice.reducer;
export const {addArticles, resetArticles, addArticle, addArticlesCount, setPage, setLimit, setArticle, setLoading, setLiked} = articlesSlice.actions;
