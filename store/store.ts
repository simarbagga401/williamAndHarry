export const useUserDetailsStore = defineStore("userDetails", () => {
  let cart = reactive<Suit[]>([]); // Add type annotation for the cart array

  const addToCart = (suit: Suit) => {
    cart.push(suit);
  };

  const deleteFromCart = (id: number) => {
    if (cart[cart.findIndex((item) => item.id == id)].quantity > 1) {
      cart[cart.findIndex((item) => item.id == id)].quantity--;
    } else {
      let removeIndex = cart.map((item) => item.id).indexOf(id);
      cart.splice(removeIndex, 1);
    }
  };

  const incrementQuantity = (id: number) => {
    let index = cart.findIndex((item) => item.id === id);
    cart[index].quantity++;
  };

  let totalAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  return { cart, totalAmount, addToCart, deleteFromCart, incrementQuantity };
});

interface Suit {
  id: number;
  name: string;
  price: number;
  coatImage: string;
  quantity: number;
  size:string;
}
