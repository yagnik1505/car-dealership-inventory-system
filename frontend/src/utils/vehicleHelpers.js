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

export const getVehicleImage = (category, id) => {
  const c = category?.toLowerCase() || 'default';
  const images = {
    suv: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop'
    ],
    sedan: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop'
    ],
    sports: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2064&auto=format&fit=crop'
    ],
    electric: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop'
    ],
    luxury: [
      'https://images.unsplash.com/photo-1503376710777-62f7902d8471?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop'
    ],
    truck: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581622378964-b04b90e3cb36?q=80&w=2073&auto=format&fit=crop'
    ],
    coupe: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2070&auto=format&fit=crop'
    ],
    hatchback: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop'
    ],
    default: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop'
    ]
  };

  const list = images[c] || images.default;
  return list[(id || 0) % list.length];
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
