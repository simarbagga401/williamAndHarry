export const useUserDetailsStore = defineStore("userDetails", () => {
  let cart = ref<Suit[]>([]); // Add type annotation for the cart array

  const addToCart = (suit: Suit) => {
    cart.value.push(suit);
  };

  const deleteFromCart = (id: number) => {
    if (
      cart.value[cart.value.findIndex((item) => item.id == id)].quantity > 1
    ) {
      cart.value[cart.value.findIndex((item) => item.id == id)].quantity--;
    } else {
      let removeIndex = cart.value.map((item) => item.id).indexOf(id);
      cart.value.splice(removeIndex, 1);
    }
  };

  let totalAmount = () => {
    return cart.value.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };
  return { cart, totalAmount, addToCart, deleteFromCart };
});

interface Suit {
  id: number;
  name: string;
  price: number;
  coatImage: string;
  quantity: number;
  size: string;
}
