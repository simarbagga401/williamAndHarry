export const useUserDetailsStore = defineStore("userDetails", () => {
  let cart = ref<Suit[]>([]); // Add type annotation for the cart array

  const addToCart = (suit: Suit) => {
    cart.value.push(suit);
  };

  let totalAmount = () => {
    return cart.value.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };
  return { cart, totalAmount, addToCart };
});

interface Suit {
  id: number;
  name: string;
  price: number;
  coatImage: string;
  quantity: number;
  coatSize: string;
  pantSize: string;
}
