import SearchBar from "../components/SearchBar";
import DrinkwareProduct from "../components/DrinkwareProduct";
import Slider1 from "../components/Slider1";
import Layout from "../layout/Layout";

const Drinkware = () => {
    return (
        <Layout>
            <SearchBar />
            <Slider1 />
            <DrinkwareProduct />
        </Layout>
    )
}

export default Drinkware;
