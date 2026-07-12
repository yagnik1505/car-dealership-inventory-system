import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Search,
  Shield,
  Zap,
  Car,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import styles from './LandingPage.module.css';

const features = [
  {
    icon: Car,
    title: 'Smart Inventory',
    description: 'Manage your entire vehicle fleet with real-time stock tracking and automated alerts.',
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find any vehicle instantly with powerful filters for make, model, category, and price.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Get insights into inventory levels, stock status, and portfolio value at a glance.',
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'JWT-powered authentication keeps your dealership data safe and accessible.',
  },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/welcome" className={styles.logo}>
          <span className={styles.logoIcon}>AV</span>
          <span>AutoVault</span>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img 
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop" 
            alt="Premium Car" 
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.badge}>
            <Zap size={14} />
            <span>Premium Dealership Platform</span>
          </div>

          <h1 className={styles.heroTitle}>
            Manage Your Inventory
            <br />
            <span className={styles.gradient}>Like a Pro</span>
          </h1>

          <p className={styles.heroDescription}>
            The modern inventory management system built for premium dealerships.
            Track, search, purchase, and restock vehicles with a beautiful,
            intuitive interface.
          </p>

          <div className={styles.heroActions}>
            <Link to="/dashboard">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Open Dashboard
              </Button>
            </Link>
            <Link to="/vehicles">
              <Button variant="secondary" size="lg">
                Browse Inventory
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className={styles.features}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>Everything you need</h2>
          <p className={styles.sectionSubtitle}>
            Powerful tools designed for modern dealership operations
          </p>
        </motion.div>

        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.featureIcon}>
                <feature.icon size={24} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to transform your dealership?</h2>
          <p>Start managing your inventory with AutoVault today.</p>
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Create Free Account
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AutoVault. Premium Inventory System.</p>
      </footer>
    </div>
  );
}
