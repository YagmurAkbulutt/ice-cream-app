import axios from "axios";
import { useEffect, useState } from "react";

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4040/toppings")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //checkbox tiklendiyse sepete ekle tik kaldırıldıysa sepetten çıkart
  const handleChange = (isChecked, item) => {
    isChecked ?
    setBasket ([...basket, item])
    : setBasket(basket.filter((i) => i.name !== item.name))
  }

  return (
    <div>
      <h1>Sos Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success">3</span> ₺
      </p>
      <h3>
        {" "}
        Toplam Ücret <span data-testid="total" className="text-success">{basket.length * 3}</span> ₺
      </h3>

      <div className="row gap-3 mt-4">
        {data.map((item) => (
          <div
            key={item.name}
            className="top-card col d-flex flex-column align-items-center"
          >
            <label htmlFor={item.name} className="text-center">
              <img src={item.imagePath} height={100} alt={item.name} />
              <p className="text-nowrap">{item.name}</p>
            </label>
            <div className="input-container">
              <input onChange={(e) => handleChange(e.target.checked, item)} id={item.name} type="checkbox" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
