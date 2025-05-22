import InfoPage from '../components/InfoPage';
import { aboutPageData } from '../data/aboutContent';

const AboutPage = () => {
  return <InfoPage {...aboutPageData} />;
};

export default AboutPage;