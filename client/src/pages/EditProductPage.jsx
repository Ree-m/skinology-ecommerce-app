import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"

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
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();

    // useEffect(()=>{
    //     fetch(`http://localhost:9000/product/${id}`).then(res=>{
    //         res.json()
    //         .then(product=>{
    //             setName(product.name)
    //             setBrand(product.brand)
    //             setPrice(product.price)
    //         })
    //     })
    // })

    async function updateProduct(e) {
        e.preventDefault()
        const response = fetch(`http://localhost:9000/edit/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, brand,description,category,use,ingredients,quantity, price }),
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
        <div className="edit-product">
            <h1>Edit Product</h1>
            <form onSubmit={updateProduct}>
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

                <button>Edit product</button>
            </form>
        </div>
    );
}

export default EditProduct;