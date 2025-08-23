import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
import Slider1 from '../components/Slider1';
import NewArrivalProductSection from '../components/NewArrivalProductSection';

const NewArrivalPage = () => {
    return (
        <Layout>
            <SearchBar />
            <Slider1 />
            <NewArrivalProductSection />
        </Layout>
    );
};

export default NewArrivalPage;
