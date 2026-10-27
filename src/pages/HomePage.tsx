import Hero from '../components/layouts/Hero';
import HomeCards from '../components/layouts/HomeCards';
import JobListings from '../components/layouts/JobListings';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings onHomePage={true} />
    </>
  );
};

export default HomePage;
