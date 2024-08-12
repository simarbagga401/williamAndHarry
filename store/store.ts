export const useUserDetailsStore = defineStore("userDetails", () => {
  let cart = reactive<Suit[]>([]); // Add type annotation for the cart array

  const addToCart = (suit: Suit) => {
    cart.push(suit);
  };

  const totalAmount = computed(() =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const deleteFromCart = (id: number) => {
    let removeIndex = cart.map((item) => item.id).indexOf(id);
    cart.splice(removeIndex, 1);
  };

  const incrementQuantity = (id: number) => {
    let index = cart.findIndex((item) => item.id === id);
    cart[index].quantity++;
  };

  return { cart, addToCart, deleteFromCart, totalAmount , incrementQuantity};
});

interface Suit {
  id: number;
  name: string;
  price: number;
  coatImage: string;
  quantity: number;
}
