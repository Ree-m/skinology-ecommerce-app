import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/add-editPages.css";
import { API_URL } from "../constants";

const AddPage = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [use, setUse] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function addProduct(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("name", name);
    data.set("brand", brand);
    data.set("description", description);
    data.set("category", category);
    data.set("use", use);
    data.set("ingredients", ingredients);
    data.set("size", size);
    data.set("price", price);
    data.set("file", files[0]);

    const response = fetch(`${API_URL}/add`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if ((await response).ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return navigate("/");
  }

  return (
    <div className="add-page">
      <form onSubmit={addProduct}>
        <h1 className="center">Add new product</h1>
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="use"
            value={use}
            onChange={(e) => setUse(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            className="file-input"
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            required
          />

          <button className="btn">Add product</button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
