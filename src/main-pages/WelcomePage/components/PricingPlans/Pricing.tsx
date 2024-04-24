// Plans.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "../.././components/Button/Button";


const styles = {
    plansSection: {
        backgroundColor: '#F7BC76', // Replace with your actual color code
        padding: '50px 0',
        
        // Add other styles for the section
    },
    planCard: {
        margin: '0 0 30px 0',
        border: 'none',
        borderRadius: '30px',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: '0px 12px 10px rgba(0, 0, 0, 0.4)', // Add this line
        // Add other styles for the card
    },
    popularPlanCard: {
        backgroundColor: '#5A2A82', // Replace with your actual color code
        color: '#FFFFFF',
        // Add other styles for the popular card
    },
    planHeader: {
        padding: '20px 20px 10px 20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px 10px 0 0', // Add this line
      },
    planBody: {
        padding: '10px 20px 20px 20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '0 0 10px 10px ',
        
        // Add other styles for the card body
    },
    description: {
        fontSize: '16px',
        marginBottom: '20px',
        // Add other styles for the description
    },
    featuresList: {
        listStyle: 'none',
        padding: '0',
        marginBottom: '20px',
        // Add other styles for the features list
    },
    featureItemBefore: {
        content: '"✓"',
        color: '#4E148C', // Replace with your actual color code
        marginRight: '10px',
        // Add other styles for the feature item before content
    },
    button: {
        width: '100%',
        padding: '10px 0',
        borderRadius: '30px',
        border: '2px solid #4E148C', // Replace with your actual color code
        backgroundColor: 'transparent',
        color: '#4E148C', // Replace with your actual color code
        // Add other styles for the button
    },
    titleFree: {
        color: '#4E148C', // Replace with your actual color code
        // Add other styles for the free title
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        // ... other styles for featureItem
      },
      checkmark: {
        color: 'green', // Or whatever color your checkmarks need to be
        marginRight: '5px',
      },
};

const plans = [
    {
        title: 'Free',
        price: 'Basic',
        subtitle: '',
        subheading: 'Basic',
        description: 'Get started with the college applications process',
        features: ['College Finder', '5 essay insights/week', 'Calendar Integration'],
        isPopular: false,
        priceLabel: 'Coming Soon!'
    },
    {
        title: '$19',
        subtitle: '/month',
        subheading: 'Pro',
        description: 'Advanced analytics to level up your application',
        features: ['Everything in basic', 'Personalized college insights', '50 essay insights/week', 'Text based notification system with cledge'],
        isPopular: false,
        priceLabel: 'Coming Soon!'
    },
    {
        title: '$199',
        subtitle: '/year',
        subheading: 'Ultimate',
        description: 'Unlock your data insights at a discounted rate.',
        features: ['Pro plan benefits', 'Unlimited essay insight', 'Complimentary cledge advisor sessions'],
        isPopular: false,
        priceLabel: 'Coming Soon!'
    }
];

const PlanCard = ({ title, subtitle, subheading, description, features, isPopular, priceLabel }) => (
    <div style={isPopular ? { ...styles.planCard, ...styles.popularPlanCard } : styles.planCard}>
      <div style={styles.planHeader}>
        <h6 style={styles.titleFree}>{title} <span style={{ fontWeight: 'normal', fontSize: '0.8em', marginLeft: '5px', color: 'black'}}>{subtitle}</span></h6>
        <h6 style={{fontSize: '1.5em'}}>{subheading}</h6>
      </div>
      <div style={styles.planBody}>
        <p style={styles.description}>{description}</p>
        <ul style={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>{feature}
            </li>
          ))}
        </ul>
        <Button >{priceLabel}</Button>
      </div>
    </div>
  );
  
  const Pricing = () => (
    <section style={styles.plansSection}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Plans</h2>
          </div>
          {plans.map((plan, index) => (
            <div className="col-md-4" key={index}>
              <PlanCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
  export default Pricing;