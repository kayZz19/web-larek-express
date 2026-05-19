import mongoose from 'mongoose';

type TImage = {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: TImage;
  category: string;
  description: string;
  price: number | null;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  image: {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
