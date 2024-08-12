export const useUserDetailsStore = defineStore("userDetails", () => {
  let cart = reactive<Suit[]>([]); // Add type annotation for the cart array

  const addToCart = (suit: Suit) => {
    cart.push(suit);
  };

  const deleteFromCart = (id: number) => {
    let removeIndex = cart.map((item) => item.id).indexOf(id);
    cart.splice(removeIndex, 1);
  };
  return { cart, addToCart, deleteFromCart };
});

interface Suit {
  id: number;
  name: string;
  price: number;
  coatImage: string;
}
