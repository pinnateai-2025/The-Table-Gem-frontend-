import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
import ProductDetails from "../components/ProductDetails";

const Products = () => {
    return (
        <Layout>
            <SearchBar />
            <ProductDetails />
        </Layout>
    )
}

export default Products;