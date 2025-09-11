import Layout from '../layout/Layout';
// import Slider1 from '../components/Slider1';
import SearchBar from '../components/SearchBar';
import WholesaleProduct from '../components/WholesaleProduct';

const Wholesale = () => {
  return (
    <Layout>
      <SearchBar />
      {/* <Slider1 /> */}
      <WholesaleProduct />
    </Layout>
  );
};

export default Wholesale;
