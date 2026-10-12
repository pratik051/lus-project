import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  CreditCard,
  Check,
  Loader2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { orderService } from '../../services/orderService';
import { EmptyState } from '../../components/common/EmptyState';

export const CartCheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    promoCode,
    promoDiscountPercent,
    discountAmount,
    tax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromo,
    removePromo,
  } = useCart();

  const { addToast } = useNotification();

  // Promo code form
  const [promoInput, setPromoInput] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Address form fields
  const [shippingData, setShippingData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    street: '123 Luxury Lane, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
  });

  // Payment form fields
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8892',
    exp: '08/28',
    cvc: '742',
    name: 'Jane Doe',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setIsApplyingPromo(true);
    try {
      const res = await applyPromo(promoInput);
      addToast(res.message, 'success');
      setPromoInput('');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!shippingData.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingData.street.trim()) errors.street = 'Street address is required';
    if (!shippingData.city.trim()) errors.city = 'City is required';
    if (!shippingData.postalCode.trim()) errors.postalCode = 'Valid postal code required';
    if (!shippingData.email.trim()) errors.email = 'Email address is required';

    if (paymentMethod === 'credit_card') {
      if (!cardData.number.trim()) errors.cardNumber = 'Card number is required';
      if (!cardData.exp.trim()) errors.exp = 'Expiration date is required';
      if (!cardData.cvc.trim()) errors.cvc = 'CVC is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      addToast('Your cart is empty.', 'error');
      return;
    }

    if (!validateForm()) {
      addToast('Please complete the required shipping & payment fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cartItems,
        shippingAddress: shippingData,
        paymentMethod:
          paymentMethod === 'credit_card'
            ? `Credit Card (ending in ${cardData.number.slice(-4)})`
            : 'Apple Pay Express',
        subtotal,
        shippingFee,
        discount: discountAmount,
        tax,
        total,
      };

      // Simulate network & payment verification delay
      await new Promise(r => setTimeout(r, 1200));

      const createdOrder = await orderService.createOrder(orderPayload);
      clearCart();
      addToast('Order confirmed! Redirecting to confirmation...', 'success');
      navigate(`/order-confirmation/${createdOrder.id}`);
    } catch (err) {
      addToast(err.message || 'Checkout failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon="cart"
          title="Your shopping bag is empty"
          description="You haven't added any items to your bag yet. Explore our curated catalog to discover handcrafted essentials."
          actionLabel="Explore New Arrivals"
          actionLink="/shop"
        />
      </div>
    );
  }

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-grow w-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Shopping Cart & Checkout
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Review your selected items and complete your secure order.
        </p>
      </div>

      {/* Main Grid: 7 cols Left, 5 cols Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (7 columns): Cart Items + Shipping Form + Payment Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* 1. Cart Items Section (Matching Stitch Screen 7) */}
          <section className="bg-surface p-5 sm:p-6 rounded-xl border border-surface-variant shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-surface-variant mb-6">
              <h2 className="text-base sm:text-lg font-bold text-on-surface">
                Cart Items ({cartCount})
              </h2>
              {subtotal >= freeShippingThreshold ? (
                <span className="text-xs font-semibold text-[#267347] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Free Shipping Unlocked
                </span>
              ) : (
                <span className="text-xs text-on-surface-variant">
                  Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping
                </span>
              )}
            </div>

            {/* Free shipping progress bar */}
            {subtotal < freeShippingThreshold && (
              <div className="mb-6 bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            )}

            {/* Items List */}
            <div className="divide-y divide-surface-variant">
              {cartItems.map(item => (
                <div key={item.itemId} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-surface-variant shrink-0 bg-surface-container"
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-sm font-semibold text-on-surface hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Color: {item.variantColor} / Size: {item.variantSize}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-on-surface shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-surface-variant rounded-md overflow-hidden bg-surface">
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs hover:bg-surface-container transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs hover:bg-surface-container transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.itemId)}
                        className="text-xs text-error hover:text-error/80 flex items-center gap-1 font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Shipping Address Section */}
          <section className="bg-surface p-5 sm:p-6 rounded-xl border border-surface-variant shadow-sm">
            <h2 className="text-base sm:text-lg font-bold text-on-surface mb-4">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-on-surface-variant mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={shippingData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-on-surface focus:outline-none focus:border-primary ${
                    formErrors.firstName ? 'border-error' : 'border-surface-variant'
                  }`}
                  placeholder="Jane"
                />
                {formErrors.firstName && <span className="text-error text-[10px] mt-0.5 block">{formErrors.firstName}</span>}
              </div>

              <div>
                <label className="block font-medium text-on-surface-variant mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={shippingData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-on-surface focus:outline-none focus:border-primary ${
                    formErrors.lastName ? 'border-error' : 'border-surface-variant'
                  }`}
                  placeholder="Doe"
                />
                {formErrors.lastName && <span className="text-error text-[10px] mt-0.5 block">{formErrors.lastName}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-on-surface-variant mb-1">Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={shippingData.street}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-on-surface focus:outline-none focus:border-primary ${
                    formErrors.street ? 'border-error' : 'border-surface-variant'
                  }`}
                  placeholder="123 Luxury Lane, Apt 4B"
                />
                {formErrors.street && <span className="text-error text-[10px] mt-0.5 block">{formErrors.street}</span>}
              </div>

              <div>
                <label className="block font-medium text-on-surface-variant mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={shippingData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-on-surface focus:outline-none focus:border-primary ${
                    formErrors.city ? 'border-error' : 'border-surface-variant'
                  }`}
                  placeholder="San Francisco"
                />
                {formErrors.city && <span className="text-error text-[10px] mt-0.5 block">{formErrors.city}</span>}
              </div>

              <div>
                <label className="block font-medium text-on-surface-variant mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingData.postalCode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-on-surface focus:outline-none focus:border-primary ${
                    formErrors.postalCode ? 'border-error' : 'border-surface-variant'
                  }`}
                  placeholder="94107"
                />
                {formErrors.postalCode && <span className="text-error text-[10px] mt-0.5 block">{formErrors.postalCode}</span>}
              </div>

              <div>
                <label className="block font-medium text-on-surface-variant mb-1">Email for Notifications *</label>
                <input
                  type="email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div>
                <label className="block font-medium text-on-surface-variant mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={shippingData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                  placeholder="+1 (555) 019-2834"
                />
              </div>
            </div>
          </section>

          {/* 3. Payment Method Section */}
          <section className="bg-surface p-5 sm:p-6 rounded-xl border border-surface-variant shadow-sm">
            <h2 className="text-base sm:text-lg font-bold text-on-surface mb-4">
              Payment Method
            </h2>

            {/* Selector Options */}
            <div className="flex gap-4 mb-6">
              <label
                onClick={() => setPaymentMethod('credit_card')}
                className={`flex-1 p-3.5 rounded-lg border cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === 'credit_card'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-variant bg-surface text-on-surface hover:border-on-surface-variant/40'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                  className="accent-primary"
                />
                <CreditCard className="w-4 h-4" />
                <span className="text-xs font-semibold">Credit Card</span>
              </label>

              <label
                onClick={() => setPaymentMethod('apple_pay')}
                className={`flex-1 p-3.5 rounded-lg border cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-variant bg-surface text-on-surface hover:border-on-surface-variant/40'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'apple_pay'}
                  onChange={() => setPaymentMethod('apple_pay')}
                  className="accent-primary"
                />
                <span className="text-xs font-semibold">Apple Pay / Digital Wallet</span>
              </label>
            </div>

            {/* Credit Card inputs */}
            {paymentMethod === 'credit_card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-on-surface-variant mb-1">Card Number *</label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary font-mono"
                    placeholder="4532 •••• •••• 8892"
                  />
                </div>

                <div>
                  <label className="block font-medium text-on-surface-variant mb-1">Expiration Date *</label>
                  <input
                    type="text"
                    value={cardData.exp}
                    onChange={(e) => setCardData(prev => ({ ...prev, exp: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary font-mono"
                    placeholder="MM / YY"
                  />
                </div>

                <div>
                  <label className="block font-medium text-on-surface-variant mb-1">Security Code (CVC) *</label>
                  <input
                    type="text"
                    value={cardData.cvc}
                    onChange={(e) => setCardData(prev => ({ ...prev, cvc: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary font-mono"
                    placeholder="742"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <div className="p-4 bg-surface-container rounded-lg border border-surface-variant text-center text-xs text-on-surface-variant">
                Your device wallet will open automatically when clicking complete order.
              </div>
            )}
          </section>

        </div>

        {/* Right Column (5 columns): Order Summary Card */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm space-y-6">
            <h2 className="text-base font-bold text-on-surface pb-3.5 border-b border-surface-variant">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-grow">
                  <Tag className="w-3.5 h-3.5 text-on-surface-variant absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. ATELIER10)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isApplyingPromo}
                  className="px-4 py-2 bg-surface-container border border-surface-variant hover:border-primary text-xs font-semibold rounded-lg text-on-surface transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoCode && (
                <div className="flex items-center justify-between mt-2.5 px-3 py-1.5 bg-[#267347]/10 text-[#267347] rounded-md text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Code {promoCode} ({promoDiscountPercent}% off)
                  </span>
                  <button onClick={removePromo} className="text-xs hover:underline">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs border-t border-surface-variant pt-4">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#267347]">
                  <span>Member Promotion ({promoDiscountPercent}%)</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-on-surface">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-on-surface border-t border-surface-variant pt-3.5">
                <span>Total Due</span>
                <span className="text-primary font-bold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Order Primary Button */}
            <button
              onClick={handleCheckoutSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary text-white text-xs sm:text-sm font-semibold py-3.5 px-6 rounded-lg hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing 256-Bit SSL Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Complete Secure Order (${total.toFixed(2)})</span>
                </>
              )}
            </button>

            {/* Security Guarantee Notice */}
            <div className="p-3 bg-surface-container rounded-lg border border-surface-variant space-y-2 text-[11px] text-on-surface-variant">
              <div className="flex items-center gap-2 text-on-surface font-semibold">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Atelier Protection & Assurance</span>
              </div>
              <p>
                256-bit encrypted simulated transaction. No actual credit card charge will occur in review mode.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CartCheckoutPage;
