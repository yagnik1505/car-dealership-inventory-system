export const LOW_STOCK_THRESHOLD = 5;

export const VEHICLE_CATEGORIES = [
  'Sedan',
  'SUV',
  'Sports',
  'Electric',
  'Luxury',
  'Truck',
  'Coupe',
  'Hatchback',
];

export const getStockStatus = (quantity) => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= LOW_STOCK_THRESHOLD) return 'low-stock';
  return 'in-stock';
};

export const getStockLabel = (quantity) => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= LOW_STOCK_THRESHOLD) return 'Low Stock';
  return 'In Stock';
};

export const filterVehicles = (vehicles, filters) => {
  const { make, model, category, minPrice, maxPrice } = filters;

  return vehicles.filter((vehicle) => {
    if (make && !vehicle.make?.toLowerCase().includes(make.toLowerCase())) {
      return false;
    }
    if (model && !vehicle.model?.toLowerCase().includes(model.toLowerCase())) {
      return false;
    }
    if (category && vehicle.category?.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    if (minPrice !== '' && minPrice != null && Number(vehicle.price) < Number(minPrice)) {
      return false;
    }
    if (maxPrice !== '' && maxPrice != null && Number(vehicle.price) > Number(maxPrice)) {
      return false;
    }
    return true;
  });
};

export const computeStats = (vehicles) => {
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.quantityInStock > 0).length;
  const outOfStock = vehicles.filter((v) => v.quantityInStock === 0).length;
  const lowStock = vehicles.filter(
    (v) => v.quantityInStock > 0 && v.quantityInStock <= LOW_STOCK_THRESHOLD
  ).length;
  const totalValue = vehicles.reduce(
    (sum, v) => sum + Number(v.price) * v.quantityInStock,
    0
  );

  return { total, available, outOfStock, lowStock, totalValue };
};

export const getVehicleGradient = (id) => {
  const gradients = [
    'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
    'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #2563eb 100%)',
    'linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)',
    'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #c2410c 100%)',
    'linear-gradient(135deg, #500724 0%, #831843 50%, #be185d 100%)',
    'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #7e22ce 100%)',
  ];
  return gradients[(id || 0) % gradients.length];
};

export const buildSearchParams = (filters) => {
  const { make, model, category, minPrice, maxPrice } = filters;
  const activeFilters = [
    make?.trim() && 'make',
    model?.trim() && 'model',
    category?.trim() && 'category',
    minPrice !== '' && maxPrice !== '' && minPrice != null && maxPrice != null && 'price',
  ].filter(Boolean);

  if (activeFilters.length !== 1) return null;

  const params = {};
  if (make?.trim()) params.make = make.trim();
  if (model?.trim()) params.model = model.trim();
  if (category?.trim()) params.category = category.trim();
  if (minPrice !== '' && maxPrice !== '' && minPrice != null && maxPrice != null) {
    params.minPrice = minPrice;
    params.maxPrice = maxPrice;
  }
  return params;
};
