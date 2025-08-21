import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
import Slider1 from '../components/Slider1';
import GiftProduct from '../components/GiftProduct';

const Gifts = () => {
    return (
        <Layout>
            <SearchBar />
            <Slider1 />
            <GiftProduct />
        </Layout>
    )
}

export default Gifts;