export const useUserDetailsStore = defineStore("userDetails", () => {
  const cart = ref<Suit[]>([]); // Add type annotation for the cart array
  const addToCart = (product: Suit) => {
    cart.value.push(product);
  };
  const deleteFromCart = (id: number) => {
    cart.value = cart.value.filter((product) => product.id !== id);
  }
  return { cart, addToCart , deleteFromCart};
});

interface Suit {
  id: number;
  name: string;
  price: number;
  coatImage:string;
}
