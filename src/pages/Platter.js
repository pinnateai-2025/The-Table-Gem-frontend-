import PlatterProducts from "../components/PlatterProducts";
import SearchBar from "../components/SearchBar";
import Slider1 from "../components/Slider1";
import Layout from "../layout/Layout";

const Platter = () => {
    return (
        <Layout>
            <SearchBar />
            <Slider1 />
            <PlatterProducts />
        </Layout>
    )
}

export default Platter;
