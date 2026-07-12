import { useState } from 'react';
import vehicleService from '../services/vehicleService';
import { useToast } from '../context/ToastContext';
import { extractErrorMessage } from '../utils/errorHandler';

export function useVehicleActions(onSuccess) {
  const toast = useToast();
  const [actionLoading, setActionLoading] = useState(false);

  const createVehicle = async (data) => {
    setActionLoading(true);
    try {
      const result = await vehicleService.create(data);
      toast.success('Vehicle added successfully');
      onSuccess?.();
      return result;
    } catch (err) {
      toast.error(extractErrorMessage(err));
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const updateVehicle = async (id, data) => {
    setActionLoading(true);
    try {
      const result = await vehicleService.update(id, data);
      toast.success('Vehicle updated successfully');
      onSuccess?.();
      return result;
    } catch (err) {
      toast.error(extractErrorMessage(err));
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setActionLoading(true);
    try {
      await vehicleService.delete(id);
      toast.success('Vehicle deleted successfully');
      onSuccess?.();
    } catch (err) {
      toast.error(extractErrorMessage(err));
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const purchaseVehicle = async (id) => {
    setActionLoading(true);
    try {
      const result = await vehicleService.purchase(id);
      toast.success('Purchase completed successfully');
      onSuccess?.();
      return result;
    } catch (err) {
      toast.error(extractErrorMessage(err));
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const restockVehicle = async (id, quantity) => {
    setActionLoading(true);
    try {
      const result = await vehicleService.restock(id, quantity);
      toast.success(`Restocked ${quantity} units successfully`);
      onSuccess?.();
      return result;
    } catch (err) {
      toast.error(extractErrorMessage(err));
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    actionLoading,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    purchaseVehicle,
    restockVehicle,
  };
}
