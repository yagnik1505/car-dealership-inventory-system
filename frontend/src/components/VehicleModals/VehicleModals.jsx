import { useState } from 'react';
import Modal from '../ui/Modal';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import VehicleForm from '../VehicleForm';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';
import { useVehicleActions } from '../../hooks/useVehicleActions';
import styles from './VehicleModals.module.css';

export function useVehicleModals(onRefresh) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [restockQty, setRestockQty] = useState('10');

  const { actionLoading, updateVehicle, deleteVehicle, purchaseVehicle, restockVehicle } =
    useVehicleActions(onRefresh);

  const closeModal = () => {
    setModalType(null);
    setSelectedVehicle(null);
    setRestockQty('10');
  };

  const openUpdate = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType('update');
  };

  const openDelete = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType('delete');
  };

  const openPurchase = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType('purchase');
  };

  const openRestock = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRestockQty('10');
    setModalType('restock');
  };

  const handleUpdate = async (data) => {
    await updateVehicle(selectedVehicle.id, data);
    closeModal();
  };

  const handleDelete = async () => {
    await deleteVehicle(selectedVehicle.id);
    closeModal();
  };

  const handlePurchase = async () => {
    await purchaseVehicle(selectedVehicle.id);
    closeModal();
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    const qty = Number(restockQty);
    if (!qty || qty <= 0) return;
    await restockVehicle(selectedVehicle.id, qty);
    closeModal();
  };

  const modals = (
    <>
      <Modal
        isOpen={modalType === 'update'}
        onClose={closeModal}
        title="Update Vehicle"
      >
        <VehicleForm
          initialData={selectedVehicle}
          onSubmit={handleUpdate}
          loading={actionLoading}
          submitLabel="Update Vehicle"
        />
      </Modal>

      <ConfirmationDialog
        isOpen={modalType === 'delete'}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        message={`Are you sure you want to delete ${selectedVehicle?.make} ${selectedVehicle?.model}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={actionLoading}
      />

      <ConfirmationDialog
        isOpen={modalType === 'purchase'}
        onClose={closeModal}
        onConfirm={handlePurchase}
        title="Confirm Purchase"
        message={`Purchase one unit of ${selectedVehicle?.make} ${selectedVehicle?.model} for ${formatCurrency(selectedVehicle?.price)}? Stock will decrease by 1.`}
        confirmLabel="Confirm Purchase"
        variant="primary"
        loading={actionLoading}
      />

      <Modal
        isOpen={modalType === 'restock'}
        onClose={closeModal}
        title="Restock Vehicle"
        size="sm"
      >
        <form onSubmit={handleRestock} className={styles.restockForm}>
          <p className={styles.restockInfo}>
            Restock {selectedVehicle?.make} {selectedVehicle?.model}
            <br />
            Current stock: {selectedVehicle?.quantityInStock} units
          </p>
          <Input
            label="Quantity to Add"
            name="quantity"
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" fullWidth loading={actionLoading}>
            Restock
          </Button>
        </form>
      </Modal>
    </>
  );

  return { openUpdate, openDelete, openPurchase, openRestock, modals };
}
