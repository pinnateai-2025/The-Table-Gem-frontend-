import SearchBar from "../components/SearchBar";
import ServewareProduct from "../components/ServewareProduct";
import Slider1 from "../components/Slider1";
import Layout from "../layout/Layout";

const Serveware = () => {
    return (
        <Layout>
            <SearchBar />
            <Slider1 />
            <ServewareProduct />
        </Layout>
    )
}

export default Serveware;
