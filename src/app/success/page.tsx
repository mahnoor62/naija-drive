'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Car, ArrowLeft, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [paymentIntent, setPaymentIntent] = useState<{
    id: string;
    status: string;
    amount: number;
    currency: string;
    metadata: {
      carName: string;
    };
  } | null>(null);
  const [redeemCode, setRedeemCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

// ...
// useEffect(() => {
//   const sessionId = searchParams.get('session_id');
//   if (!sessionId) return;

//   (async () => {
//     const res = await fetch(`/api/purchase-by-session?session_id=${sessionId}`);
//     const data = await res.json();

//     if (data.ready) {
//       setPaymentIntent({
//         id: sessionId,
//         status: 'succeeded',
//         amount: data.amount,
//         currency: data.currency,
//         metadata: { carName: data.carName },
//       });
//       setRedeemCode(data.redeemCode); // from DB (trusted)
//     } else {
//       // optional: retry after a short delay if webhook not finished
//       setTimeout(() => location.reload(), 1200);
//     }
//   })();
// }, [searchParams]);
// ...



  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Fetch session details from Stripe
      fetch(`/api/get-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPaymentIntent({
              id: sessionId,
              status: 'succeeded',
              amount: data.session.amount_total / 100, // Convert from cents
              currency: data.session.currency,
              metadata: {
                carName: data.session.metadata.carName
              }
            });
            
            // Generate a redeem code for this purchase
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setRedeemCode(code);
          }
        })
        .catch(error => {
          console.error('Error fetching session:', error);
        });
    }
  }, [searchParams]);
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;
  
    (async () => {
      const r = await fetch('/api/store-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      });
      const data = await r.json();
      if (data.ok) {
        setPaymentIntent({
          id: sessionId,
          status: 'succeeded',
          amount: data.amount,
          currency: data.currency,
          metadata: { carName: data.carName }
        });
        setRedeemCode(data.redeemCode); // ← DB se, trusted
      }
    })();
  }, [searchParams]);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-green-500/20 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg">
              Your vehicle has been purchased successfully
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {paymentIntent && (
              <div className="bg-secondary/20 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-4">
                    <Car className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {paymentIntent.metadata?.carName || 'Vehicle'}
                    </h3>
                    <p className="text-muted-foreground">
                      Vehicle Model
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₦{paymentIntent.amount?.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {redeemCode && (
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-6 border border-primary/30">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Your Redeem Code</h3>
                  <motion.div 
                    className="bg-background/50 rounded-lg p-4 border-2 border-dashed border-primary/50"
                    animate={copied ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-mono font-bold text-primary tracking-wider">
                      {redeemCode}
                    </div>
                  </motion.div>
                  <p className="text-sm text-muted-foreground">
                    Use this code in your game to unlock your vehicle
                  </p>
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(redeemCode);
                        setCopied(true);
                        setShowToast(true);
                        // Reset the copied state after 2 seconds
                        setTimeout(() => {
                          setCopied(false);
                          setShowToast(false);
                        }, 2000);
                      } catch (err) {
                        console.error('Failed to copy:', err);
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = redeemCode;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        setCopied(true);
                        setShowToast(true);
                        setTimeout(() => {
                          setCopied(false);
                          setShowToast(false);
                        }, 2000);
                      }
                    }}
                    className={`transition-all duration-200 ${
                      copied 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Next Steps:
              </h4>
              <ol className="space-y-2 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Copy the redeem code shown above</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Open your Naija Drive game</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span>Go to the garage or vehicle selection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Enter your redeem code to unlock the vehicle</span>
                </li>
              </ol>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" asChild className="flex-1">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketplace
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link href="/">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">Redeem code copied to clipboard!</span>
        </motion.div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
