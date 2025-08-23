import Layout from '../layout/Layout';
import SearchBar from '../components/SearchBar';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    return (
        <Layout>
            <SearchBar></SearchBar>
            <ContactForm />
        </Layout>
    )
}

export default Contact;