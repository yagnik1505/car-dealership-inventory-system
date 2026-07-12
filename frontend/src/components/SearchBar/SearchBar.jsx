import { Search, SlidersHorizontal, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { VEHICLE_CATEGORIES } from '../../utils/vehicleHelpers';
import styles from './SearchBar.module.css';

const initialFilters = {
  make: '',
  model: '',
  category: '',
  minPrice: '',
  maxPrice: '',
};

export { initialFilters };

export default function SearchBar({ filters, onChange, onSearch, onClear, loading = false }) {
  const hasFilters = Object.values(filters).some((v) => v !== '' && v != null);

  const handleChange = (field) => (e) => {
    onChange({ ...filters, [field]: e.target.value });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <SlidersHorizontal size={20} />
          <h2>Search & Filter</h2>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" icon={X} onClick={onClear}>
            Clear all
          </Button>
        )}
      </div>

      <div className={styles.grid}>
        <Input
          label="Make"
          name="make"
          placeholder="e.g. Tesla, BMW"
          value={filters.make}
          onChange={handleChange('make')}
        />
        <Input
          label="Model"
          name="model"
          placeholder="e.g. Model 3, X5"
          value={filters.model}
          onChange={handleChange('model')}
        />
        <div className={styles.selectWrapper}>
          <label className={styles.selectLabel} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            className={styles.select}
            value={filters.category}
            onChange={handleChange('category')}
          >
            <option value="">All Categories</option>
            {VEHICLE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Min Price"
          name="minPrice"
          type="number"
          min="0"
          placeholder="0"
          value={filters.minPrice}
          onChange={handleChange('minPrice')}
        />
        <Input
          label="Max Price"
          name="maxPrice"
          type="number"
          min="0"
          placeholder="100000"
          value={filters.maxPrice}
          onChange={handleChange('maxPrice')}
        />
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          icon={Search}
          onClick={onSearch}
          loading={loading}
        >
          Search Vehicles
        </Button>
      </div>
    </div>
  );
}
