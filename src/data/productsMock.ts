import vitamin from '../../public/ex1.png'
import iron from '../../public/ex2.png'
import lactobacillus from '../../public/ex3.png'
import omega3 from '../../public/ex4.png'
import cat_vitamin_desc from '../../public/cat_vitamin_desc.png'
import { Category, CategoryBlock } from '../types/category'

export const CATEGORIES: Category[] = [
  {
    categoryId: 1,
    thumbnailUrl: vitamin,
    name: '비타민',
    description:
      '비타민은 우리 몸이 정상적으로 기능하기 위해 반드시 필요하지만, 아주 소량만으로도 충분한 중요한 화학 물질입니다. 저희는 이러한 비타민을 설계할 때, 자연 상태의 음식 속에 존재하는 비타민의 형태와 최대한 유사하게 만들기 위해 노력하고 있습니다.',
    bannerImgUrl: cat_vitamin_desc,
  },
  {
    categoryId: 2,
    thumbnailUrl: iron,
    name: '철분',
    description:
      '비타민은 우리 몸이 정상적으로 기능하기 위해 반드시 필요하지만, 아주 소량만으로도 충분한 중요한 화학 물질입니다. 저희는 이러한 비타민을 설계할 때, 자연 상태의 음식 속에 존재하는 비타민의 형태와 최대한 유사하게 만들기 위해 노력하고 있습니다.',
    bannerImgUrl: cat_vitamin_desc,
  },
  {
    categoryId: 3,
    thumbnailUrl: lactobacillus,
    name: '유산균',
    description:
      '비타민은 우리 몸이 정상적으로 기능하기 위해 반드시 필요하지만, 아주 소량만으로도 충분한 중요한 화학 물질입니다. 저희는 이러한 비타민을 설계할 때, 자연 상태의 음식 속에 존재하는 비타민의 형태와 최대한 유사하게 만들기 위해 노력하고 있습니다.',
    bannerImgUrl: cat_vitamin_desc,
  },
  {
    categoryId: 4,
    thumbnailUrl: omega3,
    name: '오메가3',
    description:
      '비타민은 우리 몸이 정상적으로 기능하기 위해 반드시 필요하지만, 아주 소량만으로도 충분한 중요한 화학 물질입니다. 저희는 이러한 비타민을 설계할 때, 자연 상태의 음식 속에 존재하는 비타민의 형태와 최대한 유사하게 만들기 위해 노력하고 있습니다.',
    bannerImgUrl: cat_vitamin_desc,
  },
]
export const PRODUCTS_BY_CATEGORIES: CategoryBlock[] = [
  {
    category: CATEGORIES[0],
    lastProductId: 105,
    hasNext: true,
    products: [
      {
        productId: 101,
        categoryId: 1,
        name: '종합비타민 A to Z1',
        company: '헬스라이프',
        price: 27000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 102,
        categoryId: 1,
        name: '종합비타민 A to Z2',
        company: '헬스라이프',
        price: 32000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 103,
        categoryId: 1,
        name: '종합비타민 A to Z3',
        company: '헬스라이프',
        price: 31000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 104,
        categoryId: 1,
        name: '종합비타민 A to Z4',
        company: '헬스라이프',
        price: 24000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 105,
        categoryId: 1,
        name: '종합비타민 A to Z5',
        company: '헬스라이프',
        price: 29000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 106,
        categoryId: 1,
        name: '종합비타민 A to Z6',
        company: '헬스라이프',
        price: 35000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 107,
        categoryId: 1,
        name: '종합비타민 A to 7',
        company: '헬스라이프',
        price: 41000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
      {
        productId: 108,
        categoryId: 1,
        name: '종합비타민 A to Z8',
        company: '헬스라이프',
        price: 17000,
        briefDescription: '다양한 비타민을 한 번에',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_640.png',
      },
    ],
  },
]
