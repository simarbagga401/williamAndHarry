export const useUserDetailsStore = defineStore("userDetails", () => {
  const cart = ref<Suit[]>([]); // Add type annotation for the cart array
  const addToCart = (product: Suit) => {
    cart.value.push(product);
  };
  return { cart, addToCart };
});

interface Suit {
  id: number;
  name: string;
  price: number;
}
