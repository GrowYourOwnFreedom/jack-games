import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/utils";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
    const [categories, setCategories] = useState(false)
    useEffect(()=> {
        fetchCategories().then(categories => {
            setCategories(categories)
        })
    },[])

    return(<main>

        {categories ? categories.map(category => {
            return <Link key={category.slug} to={`/?category=${category.slug}`} className="link"><h2>{category.slug}</h2></Link>
        }): <h2>Loading Categories...</h2>}
        </main>
    )
}