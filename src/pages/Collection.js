import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
import Slider1 from '../components/Slider1';
import CollectionProduct from '../components/CollectionProduct';

const Collection = () => {
    return (
        <Layout active="collection">
            <SearchBar />
            <Slider1 />
            <CollectionProduct />
        </Layout>
    )
}

export default Collection;