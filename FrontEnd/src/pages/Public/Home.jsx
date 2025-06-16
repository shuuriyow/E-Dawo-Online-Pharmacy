import React from 'react';
import HeroBanner from '../../components/HeroBanner';
import FeaturedCategories from '../../components/FeaturedCategories';
import FeaturedMedicines from '../../components/FeaturedMedicines';
import PartnerPharmacies from '../../components/PartnerPharmacies';
import NewsletterPopup from '../../components/NewsletterPopup';
import HealthCards from '../../components/HealthCards';
import ServiceHighlights from '../../components/ServiceHighlights';

const Home = () => {
  // The black color you see at the top of the page is not coming from this Home component.
  // It is likely coming from a parent layout or a global style, possibly a header or navigation bar.
  // Check your main App component, layout files, or global CSS for a style like:
  // background-color: #111827; or background: black; on a header, nav, or body element.
  // To solve it, locate the element with the black background and change or remove its background color.

  return (
    <div className='bg-white'>
      <div style={{ marginTop: '2rem' }}>
        <HeroBanner />
        <div style={{ marginTop: '4rem' }}>
          <ServiceHighlights />
        </div>
      </div>
      <FeaturedCategories />
      <FeaturedMedicines />
      <PartnerPharmacies />
      <HealthCards />
      <NewsletterPopup />
    </div>
  );
};

export default Home;