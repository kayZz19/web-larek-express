import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  }
})

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Название товара обязательно'],
    unique: true,
    minlength: [2, 'Название должно содержать минимум 2 символа'],
    maxlength: [30, 'Название должно содержать максимум 30 символов'],
    trim: true
  },
  image: {
    type: imageSchema,
    required: [true, 'Изображение товара обязательно']
  },
  category: {
    type: String,
    required: [true, 'Категория товара обязательна'],
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: false,
    default: null,
    min: [0, 'Цена не может быть отрицательной']
  }
});

export default mongoose.model('product', productSchema);