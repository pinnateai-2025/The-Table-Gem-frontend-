import Layout from '../layout/Layout';
import Slider1 from '../components/Slider1';
import SearchBar from '../components/SearchBar';
import CustomMadeProduct from '../components/CustomMadeProduct';

const CustomMade = () => {
  return (
    <Layout>
        <SearchBar/>
        <Slider1/>
        <CustomMadeProduct/>
    </Layout>
    
  )
}

export default CustomMade;