import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';

export default function Store() {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState("");
    const [filterProducts, setFilterProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0); // Minimum price for filtering
    const [maxPrice, setMaxPrice] = useState(1000); // Maximum price for filtering
    const valueSearch = useRef(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilterProducts(data); // Initially show all products
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const renderData = () => {
        return filterProducts.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>
                    <img src={item.image} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                </td>
            </tr>
        ));
    };

    const handelSearch = () => {
        const searchValue = valueSearch.current.value.trim();

        if (searchValue !== "") {
            const filterData = products.filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilterProducts(filterData);
            setAlert("");
        } else {
            setFilterProducts(products);
            setAlert("");
        }
    };

    const handleReset = () => {
        setFilterProducts(products); // Reset filterProducts to the original products
        valueSearch.current.value = ""; // Clear the input field
        setAlert(""); // Clear any alerts
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (category === "All") {
            setFilterProducts(products); // Show all products
        } else {
            const filtered = products.filter((product) => product.category === category);
            setFilterProducts(filtered);
        }
    };

    const handlePriceFilter = () => {
        const filtered = products.filter((product) => {
            return product.price >= minPrice && product.price <= maxPrice;
        });
        setFilterProducts(filtered);
    };

    return (
        <>
            {/* Search and Reset Input */}
            <div className="input-group container mt-5">
                <h3>Search:</h3><br />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search.."
                    ref={valueSearch}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handelSearch}
                >
                    Search
                </button>
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleReset}
                >
                    Reset
                </button><br />
            </div>
            <div className="container">
                {alert}
            </div>

            {/* Category Navigation */}
            <ul className="nav nav-pills container my-3">
                <li className="nav-item">
                    <button className={`nav-link ${selectedCategory === "All" ? "active" : ""}`} onClick={() => handleCategoryClick("All")}>
                        All
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${selectedCategory === "women's clothing" ? "active" : ""}`} onClick={() => handleCategoryClick("women's clothing")}>
                        Women's Clothing
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${selectedCategory === "electronics" ? "active" : ""}`} onClick={() => handleCategoryClick("electronics")}>
                        Electronics
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${selectedCategory === "jewelery" ? "active" : ""}`} onClick={() => handleCategoryClick("jewelery")}>
                        Jewelry
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${selectedCategory === "men's clothing" ? "active" : ""}`} onClick={() => handleCategoryClick("men's clothing")}>
                        Men's Clothing
                    </button>
                </li>
            </ul>

            {/* Price Range Filter */}
            <div className="container">
                <h5>Filter by Price</h5>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="minPrice">Min Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="minPrice"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(Number(e.target.value))

                            }}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="maxPrice">Max Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="maxPrice"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="col-md-3 mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={handlePriceFilter}
                        >
                            Apply Price Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="container mt-4">
                <h1 className="mb-4">Product List</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProducts.length > 0 ? renderData() : (
                            <tr>
                                <td colSpan="6" className="text-center">No data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
