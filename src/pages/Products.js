import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
import ProductDetails from "../components/ProductDetails";
import YouMayLike from '../components/YouMayLike';

const Products = () => {
    return (
        <Layout>
            <SearchBar />
            <ProductDetails />
            <YouMayLike />
        </Layout>
    )
}

export default Products;