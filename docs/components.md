# Component Documentation

## Button Component
```tsx
interface ButtonProps {
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}
```

**Usage:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>
```

## ProductCard Component
```tsx
interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
}
```

**Usage:**
```tsx
<ProductCard
  id="1"
  title="Premium T-Shirt"
  price={29.99}
  image="/img/tshirt.jpeg"
  rating={4.5}
/>
```

## Header/Navigation Component
```tsx
// src/components/layout/header.tsx
// Contains site logo, nav links, cart icon, and mobile menu toggle
```

## Footer Component
```tsx
// src/components/layout/footer.tsx
// Contains links, social icons, and copyright
```

## Form Input Component
```tsx
interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: string;
  required?: boolean;
}
```