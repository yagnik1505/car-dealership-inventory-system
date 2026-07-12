import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Car,
  CheckCircle,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Search,
  ArrowRight,
  DollarSign,
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import VehicleCard from '../../components/VehicleCard';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useVehicles } from '../../hooks/useVehicles';
import { computeStats } from '../../utils/vehicleHelpers';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { vehicles, loading } = useVehicles();
  const { userRole } = useAuth();
  const stats = useMemo(() => computeStats(vehicles), [vehicles]);
  const recentVehicles = useMemo(() => vehicles.slice(0, 4), [vehicles]);

  const categoryBreakdown = useMemo(() => {
    const counts = {};
    vehicles.forEach((v) => {
      const cat = v.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [vehicles]);

  if (loading) {
    return <LoadingSpinner fullPage label="Loading dashboard..." />;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Overview of your dealership inventory</p>
        </div>
        {userRole === 'ADMIN' && (
          <Link to="/vehicles/add">
            <Button variant="primary" icon={PlusCircle}>
              Add Vehicle
            </Button>
          </Link>
        )}
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon={Car}
          label="Total Vehicles"
          value={stats.total}
          color="accent"
          delay={0}
        />
        <StatCard
          icon={CheckCircle}
          label="Available"
          value={stats.available}
          color="success"
          delay={0.05}
        />
        <StatCard
          icon={XCircle}
          label="Out of Stock"
          value={stats.outOfStock}
          color="danger"
          delay={0.1}
        />
        <StatCard
          icon={AlertTriangle}
          label="Low Stock"
          value={stats.lowStock}
          color="warning"
          delay={0.15}
        />
      </div>

      <div className={styles.grid}>
        <motion.section
          className={styles.panel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.panelHeader}>
            <h2>Portfolio Value</h2>
            <DollarSign size={20} className={styles.panelIcon} />
          </div>
          <p className={styles.portfolioValue}>{formatCurrency(stats.totalValue)}</p>
          <p className={styles.portfolioHint}>Total inventory value based on stock levels</p>

          {categoryBreakdown.length > 0 && (
            <div className={styles.chart}>
              <h3 className={styles.chartTitle}>By Category</h3>
              {categoryBreakdown.map(([category, count]) => {
                const percentage = stats.total ? (count / stats.total) * 100 : 0;
                return (
                  <div key={category} className={styles.chartRow}>
                    <div className={styles.chartLabel}>
                      <span>{category}</span>
                      <span>{count}</span>
                    </div>
                    <div className={styles.chartBar}>
                      <motion.div
                        className={styles.chartFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>

        <motion.section
          className={styles.panel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className={styles.panelTitle}>Quick Actions</h2>
          <div className={styles.actions}>
            {userRole === 'ADMIN' && (
              <Link to="/vehicles/add" className={styles.actionCard}>
                <PlusCircle size={24} />
                <div>
                  <span className={styles.actionTitle}>Add Vehicle</span>
                  <span className={styles.actionDesc}>Add new inventory</span>
                </div>
                <ArrowRight size={18} className={styles.actionArrow} />
              </Link>
            )}
            <Link to="/search" className={styles.actionCard}>
              <Search size={24} />
              <div>
                <span className={styles.actionTitle}>Search</span>
                <span className={styles.actionDesc}>Find vehicles</span>
              </div>
              <ArrowRight size={18} className={styles.actionArrow} />
            </Link>
            <Link to="/vehicles" className={styles.actionCard}>
              <Car size={24} />
              <div>
                <span className={styles.actionTitle}>View Inventory</span>
                <span className={styles.actionDesc}>Browse all vehicles</span>
              </div>
              <ArrowRight size={18} className={styles.actionArrow} />
            </Link>
          </div>
        </motion.section>
      </div>

      {recentVehicles.length > 0 && (
        <section className={styles.recent}>
          <div className={styles.recentHeader}>
            <h2>Recent Vehicles</h2>
            <Link to="/vehicles">
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View All
              </Button>
            </Link>
          </div>
          <div className={styles.recentGrid}>
            {recentVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                showActions={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
