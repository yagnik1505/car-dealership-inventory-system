import { useNavigate, useParams } from 'react-router-dom';
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
import { getStockStatus, getStockLabel, getVehicleImage } from '../../utils/vehicleHelpers';
import { useAuth } from '../../context/AuthContext';
import styles from './VehicleDetails.module.css';

export default function VehicleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userRole } = useAuth();
  const { vehicle: vehicleToShow, loading: isLoading, error: hasError, fetchVehicle: refetch } = useVehicle(id);

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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img 
            src={getVehicleImage(vehicleToShow.category, vehicleToShow.id)} 
            alt={`${vehicleToShow.make} ${vehicleToShow.model}`} 
            className={styles.carImage} 
          />
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
              className={styles.actionBtn}
            >
              {isOutOfStock ? 'Out of Stock' : 'Purchase'}
            </Button>
            {userRole === 'ADMIN' && (
              <>
                <Button
                  variant="secondary"
                  icon={Pencil}
                  onClick={() => openUpdate(vehicleToShow)}
                  className={styles.actionBtn}
                >
                  Update
                </Button>
                <Button
                  variant="success"
                  icon={PackagePlus}
                  onClick={() => openRestock(vehicleToShow)}
                  className={styles.actionBtn}
                >
                  Restock
                </Button>
                <Button
                  variant="danger"
                  icon={Trash2}
                  onClick={() => openDelete(vehicleToShow)}
                  className={styles.actionBtn}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {modals}
    </div>
  );
}
