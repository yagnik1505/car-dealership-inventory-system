# Acceptance Criteria

## User Registration

- User can register with valid details.
- Registration fails if email already exists.
- Registration fails if email format is invalid.
- Registration fails if password is empty.
- Registration fails if required fields are missing.

---

## User Login

- Registered users can log in.
- Login fails with incorrect password.
- Login fails for unknown email.
- Successful login returns a JWT token.

---

## View Vehicles

- Users can view all available vehicles.
- Only vehicles with quantity greater than zero are shown.

---

## Search Vehicles

Users can search by:

- Make
- Model
- Category
- Price Range

Search should return matching vehicles.

---

## Purchase Vehicle

- Purchase succeeds when stock is available.
- Vehicle quantity decreases by one.
- Purchase fails when quantity is zero.
- Purchase fails when vehicle does not exist.

---

## Add Vehicle

- Administrator can add a new vehicle.
- Duplicate vehicle validation is handled appropriately.

---

## Update Vehicle

- Administrator can update vehicle information.
- Invalid vehicle ID returns an error.

---

## Delete Vehicle

- Administrator can delete vehicles.
- Normal users cannot delete vehicles.

---

## Restock Vehicle

- Administrator can increase stock.
- Quantity must be positive.