import { useState, useEffect, useCallback } from 'react';
import vehicleService from '../services/vehicleService';
import { extractErrorMessage } from '../utils/errorHandler';
import { useToast } from '../context/ToastContext';

export function useVehicles(autoFetch = true) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vehicleService.getAll();
      setVehicles(data);
      return data;
    } catch (err) {
      const message = extractErrorMessage(err);
      setError(message);
      toast.error(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (autoFetch) {
      fetchVehicles();
    }
  }, [autoFetch, fetchVehicles]);

  return { vehicles, loading, error, fetchVehicles, setVehicles };
}

export function useVehicle(id) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchVehicle = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await vehicleService.getById(id);
      setVehicle(data);
      return data;
    } catch (err) {
      const message = extractErrorMessage(err);
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  return { vehicle, loading, error, fetchVehicle, setVehicle };
}
