import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Car,
  ShoppingCart,
  Pencil,
  Trash2,
  PackagePlus,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useVehicleModals } from '../../components/VehicleModals';
import { useVehicle } from '../../hooks/useVehicles';
import { formatCurrency } from '../../utils/formatters';
import { getStockStatus, getStockLabel, getVehicleGradient } from '../../utils/vehicleHelpers';
import styles from './VehicleDetails.module.css';

export default function VehicleDetails() {
  const navigate = useNavigate();
  const { vehicle, loading, error, fetchVehicle } = useVehicle(window.location.pathname.split('/').pop());
  const id = window.location.pathname.split('/').pop();
  const { vehicle: vehicleData, loading: vehicleLoading, error: vehicleError, fetchVehicle: refetch } = useVehicle(id);

  const vehicleToShow = vehicleData;
  const isLoading = vehicleLoading;
  const hasError = vehicleError;

  const { openUpdate, openDelete, openPurchase, openRestock, modals } =
    useVehicleModals(refetch);

  if (isLoading) {
    return <LoadingSpinner fullPage label="Loading vehicle details..." />;
  }

  if (hasError || !vehicleToShow) {
    return (
      <EmptyState
        icon={Car}
        title="Vehicle not found"
        description="The vehicle you're looking for doesn't exist or has been removed."
        actionLabel="Back to Inventory"
        onAction={() => navigate('/vehicles')}
      />
    );
  }

  const stockStatus = getStockStatus(vehicleToShow.quantityInStock);
  const isOutOfStock = vehicleToShow.quantityInStock === 0;

  return (
    <div className={styles.page}>
      <Button
        variant="ghost"
        icon={ArrowLeft}
        onClick={() => navigate('/vehicles')}
        className={styles.back}
      >
        Back to Inventory
      </Button>

      <div className={styles.layout}>
        <motion.div
          className={styles.imageSection}
          style={{ background: getVehicleGradient(vehicleToShow.id) }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Car size={80} className={styles.carIcon} />
          <div className={styles.imageBadges}>
            {vehicleToShow.category && (
              <span className={styles.categoryBadge}>{vehicleToShow.category}</span>
            )}
            <span className={`${styles.stockBadge} ${styles[stockStatus]}`}>
              {getStockLabel(vehicleToShow.quantityInStock)}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={styles.details}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className={styles.title}>
            {vehicleToShow.make} {vehicleToShow.model}
          </h1>
          <p className={styles.price}>{formatCurrency(vehicleToShow.price)}</p>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Make</span>
              <span className={styles.metaValue}>{vehicleToShow.make}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Model</span>
              <span className={styles.metaValue}>{vehicleToShow.model || '—'}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category</span>
              <span className={styles.metaValue}>{vehicleToShow.category || '—'}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Stock</span>
              <span className={styles.metaValue}>{vehicleToShow.quantityInStock} units</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Total Value</span>
              <span className={styles.metaValue}>
                {formatCurrency(Number(vehicleToShow.price) * vehicleToShow.quantityInStock)}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="primary"
              icon={ShoppingCart}
              disabled={isOutOfStock}
              onClick={() => openPurchase(vehicleToShow)}
            >
              {isOutOfStock ? 'Out of Stock' : 'Purchase'}
            </Button>
            <Button
              variant="secondary"
              icon={Pencil}
              onClick={() => openUpdate(vehicleToShow)}
            >
              Update
            </Button>
            <Button
              variant="success"
              icon={PackagePlus}
              onClick={() => openRestock(vehicleToShow)}
            >
              Restock
            </Button>
            <Button
              variant="danger"
              icon={Trash2}
              onClick={() => openDelete(vehicleToShow)}
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </div>

      {modals}
    </div>
  );
}
