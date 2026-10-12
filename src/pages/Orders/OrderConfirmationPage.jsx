import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldAlert, Calendar } from 'lucide-react';
import { orderService } from '../../services/orderService';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    orderService.getOrderById(orderId)
      .then(res => {
        setOrder(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm text-on-surface-variant">Generating your order confirmation...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3 mb-8">
        <div className="w-14 h-14 rounded-full bg-[#267347]/10 text-[#267347] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Thank you for your order
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto">
          We have registered order <strong className="text-on-surface font-mono">{order?.id || orderId}</strong>. A receipt and tracking notifications have been sent to your email.
        </p>
      </div>

      {/* Prominent Mock Notice (Addressing requirement: "Order confirmation interface for a successful mock checkout only, clearly distinguished from real payment confirmation") */}
      <div className="mb-8 p-4 rounded-xl bg-surface-container border border-primary/30 flex items-start gap-3 text-xs text-on-surface-variant">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <strong className="text-on-surface font-semibold block">Demonstration Architecture Notice</strong>
          <span>
            This transaction was executed in a sandboxed client environment. No actual banking provider was contacted and no real charge was made. Full persistence and REST synchronization will activate once connected to the Node.js / Express backend.
          </span>
        </div>
      </div>

      {/* Tracking Stepper & Carrier */}
      <div className="bg-surface rounded-xl border border-surface-variant p-6 shadow-sm mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-variant">
          <div>
            <span className="text-xs text-on-surface-variant block">Tracking Number</span>
            <span className="text-sm font-bold font-mono text-on-surface">
              {order?.trackingNumber || 'TRK-984210984US'}
            </span>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-on-surface-variant block">Carrier</span>
            <span className="text-sm font-semibold text-primary">
              {order?.carrier || 'FedEx Express Worldwide'}
            </span>
          </div>
        </div>

        {/* Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</div>
            <h4 className="text-xs font-semibold text-on-surface">Confirmed</h4>
            <span className="text-[10px] text-on-surface-variant block">Payment Verified</span>
          </div>
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant text-xs flex items-center justify-center font-bold border border-surface-variant">2</div>
            <h4 className="text-xs font-medium text-on-surface">Inspection</h4>
            <span className="text-[10px] text-on-surface-variant block">Atelier Studio</span>
          </div>
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant text-xs flex items-center justify-center font-bold border border-surface-variant">3</div>
            <h4 className="text-xs font-medium text-on-surface">Dispatched</h4>
            <span className="text-[10px] text-on-surface-variant block">With Courier</span>
          </div>
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant text-xs flex items-center justify-center font-bold border border-surface-variant">4</div>
            <h4 className="text-xs font-medium text-on-surface">Delivered</h4>
            <span className="text-[10px] text-on-surface-variant block">Direct Signature</span>
          </div>
        </div>
      </div>

      {/* Items Summary Card */}
      {order?.items && (
        <div className="bg-surface rounded-xl border border-surface-variant p-6 shadow-sm mb-8 space-y-4">
          <h3 className="text-sm font-bold text-on-surface pb-3 border-b border-surface-variant">
            Items in Shipment
          </h3>
          <div className="divide-y divide-surface-variant">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border border-surface-variant bg-surface-container shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-on-surface">{item.name}</h4>
                    <span className="text-[11px] text-on-surface-variant block">
                      {item.variantColor ? `${item.variantColor} / ${item.variantSize}` : item.variant}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-on-surface">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-surface-variant flex justify-between text-sm font-bold text-on-surface">
            <span>Total Paid</span>
            <span className="text-primary font-bold">${order.total?.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/account"
          className="w-full sm:w-auto bg-primary text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors text-center"
        >
          View in Account Dashboard
        </Link>
        <Link
          to="/shop"
          className="w-full sm:w-auto bg-surface border border-surface-variant text-on-surface text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg hover:bg-surface-container transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  );
};

export default OrderConfirmationPage;
