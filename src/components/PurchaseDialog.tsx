'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle, Copy, Coins, Zap, Shield, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Car as CarType } from '@/data/cars';
import { stripePromise } from '@/lib/stripe-client';

interface PurchaseDialogProps {
  car: CarType;
  isOpen: boolean;
  onClose: () => void;
}

export function PurchaseDialog({ car, isOpen, onClose }: PurchaseDialogProps) {
  const [purchaseStep, setPurchaseStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const [redeemCode, setRedeemCode] = useState<string>('');

  // Reset state when dialog opens or car changes
  const resetState = () => {
    setPurchaseStep('confirm');
    setRedeemCode('');
  };

  // Reset state when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      resetState();
    }
  }, [isOpen, car.id]);

  const generateRedeemCode = () => {
    // Generate a 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRedeemCode(code);
    setPurchaseStep('success');
  };

  const handlePurchase = async () => {
    setPurchaseStep('processing');
    
    try {
      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carId: car.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setPurchaseStep('confirm');
      // You could show an error message here
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(redeemCode);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyAndClose = async () => {
    await copyToClipboard();
    resetState();
    // Remove car parameter from URL when dialog is closed
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('car');
      window.history.replaceState({}, '', url.toString());
    }
    onClose();
  };

  const handleClose = () => {
    resetState();
    // Remove car parameter from URL when dialog is closed
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('car');
      window.history.replaceState({}, '', url.toString());
    }
    onClose();
  };



  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {purchaseStep === 'confirm' && 'Purchase Vehicle'}
            {purchaseStep === 'processing' && 'Processing Payment'}
            {purchaseStep === 'success' && 'Purchase Successful!'}
          </DialogTitle>
          <DialogDescription>
            {purchaseStep === 'confirm' && 'Confirm your purchase and proceed to payment'}
            {purchaseStep === 'processing' && 'Please wait while we process your payment...'}
            {purchaseStep === 'success' && 'Your vehicle has been purchased successfully!'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {purchaseStep === 'confirm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Car Details */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-4">
                    <div className="text-4xl">🚗</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground">{car.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Speed</span>
                      <span>{car.stats.speed}</span>
                    </div>
                    <Progress value={car.stats.speed} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Acceleration</span>
                      <span>{car.stats.acceleration}</span>
                    </div>
                    <Progress value={car.stats.acceleration} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Handling</span>
                      <span>{car.stats.handling}</span>
                    </div>
                    <Progress value={car.stats.handling} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Braking</span>
                      <span>{car.stats.braking}</span>
                    </div>
                    <Progress value={car.stats.braking} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-lg text-muted-foreground">Total Price:</span>
                  <span className="text-3xl font-bold text-primary">₦{car.price.toLocaleString()}</span>
                </div>
              </div>

              <Alert>
                <Coins className="h-4 w-4" />
                <AlertDescription>
                  After successful payment, you'll receive a 6-digit redeem code to unlock this vehicle in your game.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handlePurchase} className="flex-1 bg-primary hover:bg-primary/90">
                  Proceed to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {purchaseStep === 'processing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Car className="w-16 h-16 text-primary" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Processing Payment...</h3>
                <p className="text-muted-foreground">Please do not close this window</p>
              </div>
            </motion.div>
          )}

          {purchaseStep === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-green-500/20 rounded-full w-32 h-32 mx-auto flex items-center justify-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Purchase Successful!</h3>
                <p className="text-muted-foreground mb-6">
                  Your {car.name} has been purchased. Use the redeem code below to unlock it in your game.
                </p>
              </div>

              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Your Redeem Code:</h4>
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-primary/10 border-2 border-primary/20 rounded-lg px-6 py-3">
                    <span className="text-3xl font-mono font-bold text-primary tracking-widest">
                      {redeemCode}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>How to redeem:</strong><br />
                  1. Open your Naija Drive game<br />
                  2. Go to the garage or vehicle selection<br />
                  3. Enter the code: <strong>{redeemCode}</strong><br />
                  4. Your {car.name} will be unlocked!
                </AlertDescription>
              </Alert>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Close
                </Button>
                <Button onClick={copyAndClose} className="flex-1 bg-primary hover:bg-primary/90">
                  Copy Code & Close
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
