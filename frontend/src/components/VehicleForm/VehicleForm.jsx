import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { VEHICLE_CATEGORIES } from '../../utils/vehicleHelpers';
import styles from './VehicleForm.module.css';

const emptyForm = {
  make: '',
  model: '',
  category: '',
  price: '',
  quantityInStock: '',
};

export default function VehicleForm({ initialData, onSubmit, loading, submitLabel = 'Save Vehicle' }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        make: initialData.make || '',
        model: initialData.model || '',
        category: initialData.category || '',
        price: initialData.price?.toString() || '',
        quantityInStock: initialData.quantityInStock?.toString() || '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.make.trim()) newErrors.make = 'Make is required';
    if (!form.price || Number(form.price) <= 0) newErrors.price = 'Price must be greater than zero';
    if (form.quantityInStock === '' || Number(form.quantityInStock) < 0) {
      newErrors.quantityInStock = 'Quantity cannot be negative';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      make: form.make.trim(),
      model: form.model.trim() || null,
      category: form.category || null,
      price: Number(form.price),
      quantityInStock: Number(form.quantityInStock),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Make"
        name="make"
        placeholder="e.g. Tesla"
        value={form.make}
        onChange={handleChange('make')}
        error={errors.make}
        required
      />
      <Input
        label="Model"
        name="model"
        placeholder="e.g. Model 3"
        value={form.model}
        onChange={handleChange('model')}
      />
      <div className={styles.selectWrapper}>
        <label className={styles.selectLabel} htmlFor="form-category">
          Category
        </label>
        <select
          id="form-category"
          name="category"
          className={styles.select}
          value={form.category}
          onChange={handleChange('category')}
        >
          <option value="">Select category</option>
          {VEHICLE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <Input
          label="Price ($)"
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="45000"
          value={form.price}
          onChange={handleChange('price')}
          error={errors.price}
          required
        />
        <Input
          label="Quantity in Stock"
          name="quantityInStock"
          type="number"
          min="0"
          placeholder="10"
          value={form.quantityInStock}
          onChange={handleChange('quantityInStock')}
          error={errors.quantityInStock}
          required
        />
      </div>
      <Button type="submit" variant="primary" fullWidth loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}
