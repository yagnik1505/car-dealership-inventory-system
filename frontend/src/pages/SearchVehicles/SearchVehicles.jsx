import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchBar, { initialFilters } from '../../components/SearchBar/SearchBar';
import VehicleCard from '../../components/VehicleCard';
import { useVehicleModals } from '../../components/VehicleModals';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import vehicleService from '../../services/vehicleService';
import { useToast } from '../../context/ToastContext';
import styles from './SearchVehicles.module.css';

export default function SearchVehicles() {
  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { showToast } = useToast();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v != null)
      );
      
      const data = await vehicleService.search(activeFilters);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to search vehicles', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilters(initialFilters);
    setResults([]);
    setHasSearched(false);
  };

  const { openUpdate, openDelete, openPurchase, openRestock, modals } =
    useVehicleModals(handleSearch);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Search Vehicles</h1>
        <p className={styles.subtitle}>Find specific vehicles in your inventory</p>
      </div>

      <SearchBar
        filters={filters}
        onChange={setFilters}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      <div className={styles.resultsContainer}>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <LoadingSpinner label="Searching inventory..." />
          </div>
        ) : hasSearched && results.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No matches found"
            description="Try adjusting your filters to find what you're looking for."
            actionLabel="Clear Filters"
            onAction={handleClear}
          />
        ) : hasSearched && results.length > 0 ? (
          <div>
            <p className={styles.resultsCount}>
              Found {results.length} vehicle{results.length !== 1 ? 's' : ''}
            </p>
            <div className={styles.grid}>
              {results.map((vehicle, index) => (
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
          </div>
        ) : null}
      </div>

      {modals}
    </div>
  );
}
