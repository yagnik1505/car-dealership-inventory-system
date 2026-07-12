import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import authService from '../../services/authService';
import { useToast } from '../../context/ToastContext';
import { extractErrorMessage } from '../../utils/errorHandler';
import styles from './Register.module.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.register(form);
      toast.success(response.message || 'Account created successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.header}>
        <h1>Create account</h1>
        <p>Join AutoVault and manage your inventory</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          icon={User}
          value={form.name}
          onChange={handleChange('name')}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@dealership.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange('email')}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          icon={Lock}
          value={form.password}
          onChange={handleChange('password')}
          required
        />
        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Create Account
        </Button>
      </form>

      <p className={styles.footer}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
