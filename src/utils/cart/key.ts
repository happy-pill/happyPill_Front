export const getCartStorageKey = () => {
  // TO DO: store에서 유저 정보 가져오는 기능 > 유저 store 만들어지면
  const userId = null
  return userId ? `cart_${userId}` : 'cart_guest'
}
