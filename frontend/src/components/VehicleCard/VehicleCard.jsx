import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Pencil, Trash2, PackagePlus } from 'lucide-react';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';
import { getStockStatus, getStockLabel, getVehicleImage } from '../../utils/vehicleHelpers';
import { useAuth } from '../../context/AuthContext';
import styles from './VehicleCard.module.css';

export default function VehicleCard({
  vehicle,
  index = 0,
  onPurchase,
  onUpdate,
  onDelete,
  onRestock,
  showActions = true,
}) {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const stockStatus = getStockStatus(vehicle.quantityInStock);
  const isOutOfStock = vehicle.quantityInStock === 0;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className={styles.imageArea}
        onClick={() => navigate(`/vehicles/${vehicle.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/vehicles/${vehicle.id}`)}
      >
        <img 
          src={getVehicleImage(vehicle.category, vehicle.id)} 
          alt={`${vehicle.make} ${vehicle.model}`} 
          className={styles.carImage} 
        />
        <div className={styles.badges}>
          {vehicle.category && (
            <span className={styles.categoryBadge}>{vehicle.category}</span>
          )}
          <span className={`${styles.stockBadge} ${styles[stockStatus]}`}>
            {getStockLabel(vehicle.quantityInStock)}
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <div
          className={styles.info}
          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/vehicles/${vehicle.id}`)}
        >
          <h3 className={styles.title}>
            {vehicle.make} {vehicle.model}
          </h3>
          <p className={styles.meta}>
            Stock: {vehicle.quantityInStock} unit{vehicle.quantityInStock !== 1 ? 's' : ''}
          </p>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(vehicle.price)}</span>

          {showActions && (
            <div className={styles.actions}>
              <Button
                size="sm"
                variant="primary"
                icon={ShoppingCart}
                disabled={isOutOfStock}
                onClick={() => onPurchase?.(vehicle)}
              >
                Buy
              </Button>
              {userRole === 'ADMIN' && (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Pencil}
                    onClick={() => onUpdate?.(vehicle)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={PackagePlus}
                    onClick={() => onRestock?.(vehicle)}
                  >
                    Restock
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    icon={Trash2}
                    onClick={() => onDelete?.(vehicle)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
