import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  HelpCircle,
  CheckCircle2,
  Truck,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Lock,
  LogOut,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { orderService } from '../../services/orderService';
import { ProductCard } from '../../components/products/ProductCard';
import { EmptyState } from '../../components/common/EmptyState';

export const AccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'profile';

  const { user, updateProfile, addAddress, logout } = useAuth();
  const { wishlistProducts, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || 'Jane',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'jane.doe@example.com',
    phone: user?.phone || '+1 (555) 019-2834',
  });

  // New Address Modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    title: 'New Address',
    fullName: user ? `${user.firstName} ${user.lastName}` : 'Jane Doe',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (activeTabParam) {
      setActiveTab(activeTabParam);
    }
  }, [activeTabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  useEffect(() => {
    setIsLoadingOrders(true);
    orderService.getUserOrders().then(res => {
      setOrders(res);
      setIsLoadingOrders(false);
    });
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    addToast('Profile updated successfully.', 'success');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressForm.street.trim() || !newAddressForm.city.trim()) {
      addToast('Please enter street and city.', 'error');
      return;
    }
    addAddress(newAddressForm);
    setIsAddressModalOpen(false);
    setNewAddressForm({
      title: 'New Address',
      fullName: `${user?.firstName || ''} ${user?.lastName || ''}`,
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      phone: '',
    });
    addToast('New address added.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-grow w-full">
      
      {/* Header (Matching Stitch Screen 6) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-variant mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Customer Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Manage your profile, active shipments, saved addresses, and preferences.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#267347]" />
            {user?.memberTier || 'Verified Member'}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-error transition-colors px-3 py-1.5 rounded-lg border border-surface-variant"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Dashboard Layout: 3 cols Navigation Tabs, 9 cols Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Tabs (3 columns) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface p-2 rounded-xl border border-surface-variant shadow-sm space-y-1">
            <button
              onClick={() => handleTabChange('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Management</span>
            </button>

            <button
              onClick={() => handleTabChange('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History & Tracking</span>
            </button>

            <button
              onClick={() => handleTabChange('addresses')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => handleTabChange('wishlist')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist Items ({wishlistCount})</span>
            </button>

            <button
              onClick={() => handleTabChange('support')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'support'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Customer Support</span>
            </button>
          </div>

          {/* Quick Summary Card (Matching Stitch Screen 6) */}
          <div className="bg-surface-container p-4 rounded-xl border border-surface-variant space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Active Orders</span>
              <span className="font-bold text-primary">
                {orders.filter(o => o.status !== 'Delivered').length} in transit
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Saved Items</span>
              <span className="font-bold text-on-surface">{wishlistCount} items</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Reward Points</span>
              <span className="font-bold text-[#267347]">{user?.rewardPoints || 1250} pts</span>
            </div>
          </div>
        </div>

        {/* Content Canvas Area (9 columns) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: Profile Management */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm">
                <h2 className="text-base font-bold text-on-surface mb-4">
                  Personal Information
                </h2>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-on-surface-variant font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-on-surface-variant font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-on-surface-variant font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-on-surface-variant font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Password Section */}
              <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm">
                <h2 className="text-base font-bold text-on-surface mb-4">
                  Security & Password
                </h2>
                <div className="max-w-md space-y-3 text-xs">
                  <div>
                    <label className="block text-on-surface-variant font-medium mb-1">Current Password</label>
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-on-surface-variant font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter minimum 8 characters"
                      className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => addToast('Password updated (simulated).', 'success')}
                    className="bg-surface-container hover:bg-surface-container-high border border-surface-variant text-on-surface text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Order History & Tracking */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-on-surface">Order History & Tracking</h2>
              {isLoadingOrders ? (
                <div className="p-8 text-center text-xs text-on-surface-variant">Loading orders...</div>
              ) : orders.length > 0 ? (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="bg-surface rounded-xl border border-surface-variant p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-surface-variant text-xs">
                      <div>
                        <span className="font-bold text-on-surface text-sm">{order.id}</span>
                        <span className="text-on-surface-variant block mt-0.5">Placed on {order.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                            order.status === 'Delivered'
                              ? 'bg-[#267347]/10 text-[#267347]'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="font-bold text-on-surface text-sm">
                          ${order.total?.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Items row */}
                    <div className="flex flex-wrap gap-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-surface-container p-2 rounded-lg border border-surface-variant text-xs">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded bg-surface shrink-0"
                          />
                          <div>
                            <span className="font-medium text-on-surface line-clamp-1 max-w-[150px]">{item.name}</span>
                            <span className="text-[10px] text-on-surface-variant">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Timeline Tracker */}
                    {order.timeline && (
                      <div className="pt-2">
                        <div className="text-xs text-on-surface-variant mb-2 flex items-center gap-1.5 font-medium">
                          <Truck className="w-3.5 h-3.5 text-primary" />
                          <span>Tracking: {order.trackingNumber} ({order.carrier})</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                          {order.timeline.slice(0, 4).map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  step.completed ? 'bg-primary' : 'bg-surface-variant'
                                }`}
                              />
                              <span className={step.completed ? 'text-on-surface font-medium' : 'text-on-surface-variant/60'}>
                                {step.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <EmptyState
                  icon="cart"
                  title="No orders yet"
                  description="When you place orders, they will appear here with full parcel tracking details."
                />
              )}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-on-surface">Saved Addresses</h2>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.addresses?.map(addr => (
                  <div
                    key={addr.id}
                    className="bg-surface p-5 rounded-xl border border-surface-variant shadow-sm space-y-2 relative"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-on-surface">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-on-surface mt-1">{addr.fullName}</p>
                    <p className="text-xs text-on-surface-variant">{addr.street}</p>
                    <p className="text-xs text-on-surface-variant">
                      {addr.city}, {addr.state} {addr.postalCode}
                    </p>
                    <p className="text-xs text-on-surface-variant">{addr.country}</p>
                    {addr.phone && <p className="text-[11px] text-on-surface-variant mt-2">Tel: {addr.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Wishlist Items */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-on-surface">
                Saved Wishlist Items ({wishlistCount})
              </h2>
              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {wishlistProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="wishlist"
                  title="Your wishlist is empty"
                  description="Tap the heart icon on any product to save it to your personal wishlist."
                  actionLabel="Discover Products"
                  actionLink="/shop"
                />
              )}
            </div>
          )}

          {/* TAB 5: Customer Support */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm space-y-4">
                <h2 className="text-base font-bold text-on-surface">Atelier Concierge</h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Our private client advisory team is available Monday through Saturday, 9:00 AM – 7:00 PM CET, to assist with styling inquiries, measurements, leather care, and expedited global delivery.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-surface-container rounded-lg border border-surface-variant space-y-1">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold block text-on-surface">Email Concierge</span>
                    <span className="text-xs text-on-surface-variant">concierge@luxstore.internal</span>
                  </div>
                  <div className="p-4 bg-surface-container rounded-lg border border-surface-variant space-y-1">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold block text-on-surface">Telephone Advisory</span>
                    <span className="text-xs text-on-surface-variant">+39 02 8940 1200 (Milan)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-surface rounded-xl border border-surface-variant max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-on-surface">Add New Shipping Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block text-on-surface-variant mb-1">Address Label</label>
                <input
                  type="text"
                  placeholder="e.g. Vacation Villa"
                  value={newAddressForm.title}
                  onChange={(e) => setNewAddressForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
              <div>
                <label className="block text-on-surface-variant mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={newAddressForm.fullName}
                  onChange={(e) => setNewAddressForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
              <div>
                <label className="block text-on-surface-variant mb-1">Street Address</label>
                <input
                  type="text"
                  placeholder="123 Example Blvd, Apt 2"
                  value={newAddressForm.street}
                  onChange={(e) => setNewAddressForm(prev => ({ ...prev, street: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-on-surface-variant mb-1">City</label>
                  <input
                    type="text"
                    value={newAddressForm.city}
                    onChange={(e) => setNewAddressForm(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                  />
                </div>
                <div>
                  <label className="block text-on-surface-variant mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={newAddressForm.postalCode}
                    onChange={(e) => setNewAddressForm(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 border border-surface-variant rounded-lg text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountPage;
