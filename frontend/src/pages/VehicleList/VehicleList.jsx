import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import VehicleCard from '../../components/VehicleCard';
import { useVehicleModals } from '../../components/VehicleModals';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { SkeletonGrid } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';
import { useVehicles } from '../../hooks/useVehicles';
import { Car } from 'lucide-react';
import styles from './VehicleList.module.css';

export default function VehicleList() {
  const { vehicles, loading, fetchVehicles } = useVehicles();
  const { openUpdate, openDelete, openPurchase, openRestock, modals } =
    useVehicleModals(fetchVehicles);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventory</h1>
          <p className={styles.subtitle}>
            {loading ? 'Loading...' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} in stock`}
          </p>
        </div>
        <Link to="/vehicles/add">
          <Button variant="primary" icon={PlusCircle}>
            Add Vehicle
          </Button>
        </Link>
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : vehicles.length === 0 ? (
        <EmptyState
          icon={Car}
          title="No vehicles yet"
          description="Start building your inventory by adding your first vehicle."
          actionLabel="Add Vehicle"
          onAction={() => window.location.href = '/vehicles/add'}
        />
      ) : (
        <div className={styles.grid}>
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              onPurchase={openPurchase}
              onUpdate={openUpdate}
              onDelete={openDelete}
              onRestock={openRestock}
            />
          ))}
        </div>
      )}

      {modals}
    </div>
  );
}
