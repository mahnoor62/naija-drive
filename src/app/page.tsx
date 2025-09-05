'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Car, Zap, Shield, Gauge, Star, ShoppingCart, Coins, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cars } from '@/data/cars';
import { PurchaseDialog } from '@/components/PurchaseDialog';

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL parameters for direct car selection
  useEffect(() => {
    const carId = searchParams.get('car');
    if (carId) {
      const car = cars.find(c => c.id === carId);
      if (car) {
        setSelectedCar(car);
        setIsPurchaseDialogOpen(true);
      }
    }
  }, [searchParams]);

  // Filter and search logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchQuery]);

  // Get featured cars for marquee (deterministic selection)
  const marqueeCars = useMemo(() => {
    // Select first 8 cars for consistent server/client rendering
    return cars.slice(0, 8);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-primary p-2 rounded-lg"
              >
                <Car className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">NAIJA DRIVE</h1>
                <p className="text-muted-foreground text-sm">VEHICLE MARKETPLACE</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 flex items-center space-x-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="text-foreground font-semibold">₦20,000</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            UNLOCK YOUR
            <span className="text-primary block">DREAM CARS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Purchase premium vehicles for your Naija Drive experience. 
            Get instant redeem codes to unlock cars in-game!
          </motion.p>
        </div>

        {/* Featured Cars Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">FEATURED VEHICLES</h3>
            <p className="text-muted-foreground">Discover our amazing car collection</p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-6">
              {marqueeCars.map((car, index) => (
                <motion.div
                  key={`${car.id}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 w-64"
                >
                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-3 aspect-square flex items-center justify-center">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'block';
                        }}
                      />
                      <div className="text-3xl hidden">🚗</div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{car.name}</h4>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <span>⚡</span>
                            <span>{car.stats.speed}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <span>🎯</span>
                            <span>{car.stats.handling}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-primary">₦{car.price.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.section>

      {/* Car Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="container mx-auto px-4 pb-12"
      >
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">ALL VEHICLES</h3>
        
        {/* Search Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search cars by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 border-border"
            />
          </div>
          
          {/* Results Count */}
          <div className="text-center text-muted-foreground">
            Showing {filteredCars.length} of {cars.length} vehicles
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <Card className={`transition-all duration-300 ${
                selectedCar.id === car.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{car.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 mb-4 aspect-square flex items-center justify-center">
                    <div className="text-4xl">🚗</div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Speed</span>
                      <span>{car.stats.speed}</span>
                    </div>
                    <Progress value={car.stats.speed} className="h-1" />
                    
                    <div className="flex justify-between text-xs">
                      <span>Accel</span>
                      <span>{car.stats.acceleration}</span>
                    </div>
                    <Progress value={car.stats.acceleration} className="h-1" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₦{car.price.toLocaleString()}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCar(car);
                        setIsPurchaseDialogOpen(true);
                      }}
                    >
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-card/50 backdrop-blur-sm border-t border-border mt-12"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Car className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">NAIJA DRIVE</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Naija Drive Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Purchase Dialog */}
      <PurchaseDialog 
        car={selectedCar}
        isOpen={isPurchaseDialogOpen}
        onClose={() => setIsPurchaseDialogOpen(false)}
      />
    </div>
  );
}