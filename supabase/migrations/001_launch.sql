-- Unified schema for November 3rd launch
-- Meauxbility Foundation Database Schema

-- Grants table for grant applications
CREATE TABLE IF NOT EXISTS grants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  story TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  amount DECIMAL(10,2),
  equipment_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT,
  email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  recurring BOOLEAN DEFAULT false,
  stripe_payment_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table for Inner Animals shop
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  brand TEXT DEFAULT 'Inner Animals',
  category TEXT,
  inventory INT DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  stripe_payment_id TEXT,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_grants_status ON grants(status);
CREATE INDEX IF NOT EXISTS idx_grants_created_at ON grants(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_grants_updated_at BEFORE UPDATE ON grants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample products for Inner Animals
INSERT INTO products (name, description, price, category, inventory) VALUES
  ('Warrior Tee', 'Premium cotton tee for the brave', 35.00, 'T-Shirts', 50),
  ('Resilience Hoodie', 'Comfort meets strength in this premium hoodie', 65.00, 'Hoodies', 30),
  ('Victory Cap', 'Crown your achievements with style', 25.00, 'Accessories', 100),
  ('Strength Tank', 'Show your power in this athletic tank', 30.00, 'T-Shirts', 40),
  ('Champion Crew', 'Classic crewneck for champions', 45.00, 'Sweatshirts', 35),
  ('Courage Beanie', 'Stay warm with courage', 20.00, 'Accessories', 75)
ON CONFLICT DO NOTHING;

-- Public policies for grants (allow anyone to submit)
CREATE POLICY "Anyone can submit grant applications" ON grants
  FOR INSERT WITH CHECK (true);

-- Public policies for donations (allow anyone to donate)
CREATE POLICY "Anyone can make donations" ON donations
  FOR INSERT WITH CHECK (true);

-- Public policies for products (allow anyone to view)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Public policies for orders (authenticated users can view their own orders)
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (true);

-- Comments for documentation
COMMENT ON TABLE grants IS 'Grant applications from individuals seeking assistance';
COMMENT ON TABLE donations IS 'Donations received to support the foundation';
COMMENT ON TABLE products IS 'Products available in the Inner Animals shop';
COMMENT ON TABLE orders IS 'Customer orders from the shop';
COMMENT ON TABLE order_items IS 'Line items for each order';
COMMENT ON TABLE admin_users IS 'Administrative users with access to the portal';
