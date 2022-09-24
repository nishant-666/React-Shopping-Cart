import { useState } from "react";
import "./App.css";

const itemList = [
  {
    name: "Book",
    price: 5000,
  },
  {
    name: "Laptop",
    price: 2000,
  },
  {
    name: "Monitor",
    price: 5000,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const add = (current) => {
    const exist = cart.find((item) => item.name === current.name);
    if (exist) {
      setCart(
        cart.map((item) => {
          if (item.name === current.name) {
            return {
              ...exist,
              qty: exist.qty + 1,
              price: exist.price,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { ...current, qty: 1 }]);
    }
  };
  const remove = (product) => {
    const exist = cart.find((item) => item.name === product.name);
    if (exist.qty === 1) {
      setCart(cart.filter((item) => item.name !== product.name));
    } else {
      setCart(
        cart.map((item) =>
          item.name === product.name ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  };
  const total = cart.reduce((a, c) => a + c.qty * c.price, 0);
  return (
    <div className="App">
      <div className="card">
        {itemList.map((item) => {
          return (
            <div className="card-inner">
              <p>{item.name}</p>
              <p>Rs. {item.price}</p>
              <button onClick={() => add(item)}>+</button>
            </div>
          );
        })}
      </div>
      <h1>Cart</h1>
      <div className="card">
        {cart.map((item) => {
          return (
            <div className="card-inner">
              <p>QTY: {item.qty}</p>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              <p>Total: Rs. {item.price * item.qty}</p>
              <button onClick={() => remove(item)}>-</button>
            </div>
          );
        })}
      </div>
      <h1>Total: {total}</h1>
    </div>
  );
}

export default App;
