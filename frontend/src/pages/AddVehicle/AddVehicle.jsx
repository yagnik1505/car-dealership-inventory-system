import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import VehicleForm from '../../components/VehicleForm';
import { useVehicleActions } from '../../hooks/useVehicleActions';
import styles from './AddVehicle.module.css';

export default function AddVehicle() {
  const navigate = useNavigate();
  const { actionLoading, createVehicle } = useVehicleActions(() => {
    navigate('/vehicles');
  });

  const handleSubmit = async (data) => {
    await createVehicle(data);
  };

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

      <div className={styles.header}>
        <h1 className={styles.title}>Add Vehicle</h1>
        <p className={styles.subtitle}>Add a new vehicle to your inventory</p>
      </div>

      <div className={styles.formCard}>
        <VehicleForm
          onSubmit={handleSubmit}
          loading={actionLoading}
          submitLabel="Add Vehicle"
        />
      </div>
    </div>
  );
}
