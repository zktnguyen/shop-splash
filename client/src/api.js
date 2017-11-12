import axios from 'axios';

export default {
  books: {
    post: book => axios.post('/api/books', book).then(res => res.data.data),
    getAll: () => axios.get('/api/books').then(res => res.data.data),
    delete: _id => axios.delete(`/api/books/${_id}`).then(res => res.data)
  },
  cart: {
    post: item => axios.post('/api/cart', item).then(res => res.data.data),
    get: () => axios.get('/api/cart').then(res => res.data.data)
  },
  images: {
    get: () => axios.get('/api/images').then(res => res.data.data)
  }
};
