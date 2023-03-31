import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import "../styles/add-editPages.css"

const EditProduct = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [use, setUse] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [files, setFiles] = useState("")
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();


    async function updateProduct(e) {
        e.preventDefault()
        const response = fetch(`http://localhost:9000/edit/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, brand, description, category, use, ingredients, quantity, price, file: files?.[0] }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        if ((await response).ok) {
            setRedirect(true)
        }
    }
    if (redirect) {
        return navigate(`/product/${id}`)
    }

    return (
        <div className="edit-page">
            <form onSubmit={updateProduct}>
                <h1 className="center">Edit Product</h1>
                <div>
                    <input type="text"
                        placeholder="name"
                        vaue={name}
                        onChange={(e) => setName(e.target.value)} />

                    <input type="text"
                        placeholder="brand"
                        vaue={brand}
                        onChange={(e) => setBrand(e.target.value)} />


                    <input type="text"
                        placeholder="description"
                        vaue={description}
                        onChange={(e) => setDescription(e.target.value)} />


                    <input type="text"
                        placeholder="category"
                        vaue={category}
                        onChange={(e) => setCategory(e.target.value)} />


                    <input type="text"
                        placeholder="use"
                        value={use}
                        onChange={(e) => setUse(e.target.value)} />

                    <input type="text"
                        placeholder="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)} />


                    <input type="number"
                        placeholder="quantity"
                        vaue={quantity}
                        onChange={(e) => setQuantity(e.target.value)} />

                    <input type="number"
                        placeholder="price"
                        vaue={price}
                        onChange={(e) => setPrice(e.target.value)} />


                    <input className="file-input" type="file"


                        onChange={(e) => setFiles(e.target.files)} />

                    <button className="btn">Edit product</button>

                </div>


            </form>
        </div>
    );
}

export default EditProduct;