import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
// import Slider1 from '../components/Slider1';
import Story from '../components/Story';

const OurStory = () => {
    return (
        <Layout>
            <SearchBar />
            {/* <Slider1 /> */}
            <Story />
        </Layout>
    )
}

export default OurStory;