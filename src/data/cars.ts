export interface Car {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stats: {
    speed: number;
    acceleration: number;
    handling: number;
    braking: number;
  };
}

export const cars: Car[] = [
  {
    id: 'bmw-m5',
    name: 'BMW M5',
    price: 2500,
    image: '/cars/car1.png',
    description: 'High-performance luxury sedan with exceptional power and comfort.',
    stats: { speed: 85, acceleration: 90, handling: 80, braking: 85 }
  },
  {
    id: 'porsche-911',
    name: 'Porsche 911',
    price: 4500,
    image: '/cars/car1.png',
    description: 'Iconic sports car with legendary performance and precision.',
    stats: { speed: 95, acceleration: 95, handling: 95, braking: 90 }
  },
  {
    id: 'ferrari-f40',
    name: 'Ferrari F40',
    price: 8000,
    image: '/cars/car1.png',
    description: 'Legendary supercar that defined an era of automotive excellence.',
    stats: { speed: 100, acceleration: 100, handling: 85, braking: 80 }
  },
  {
    id: 'lamborghini-aventador',
    name: 'Lamborghini Aventador',
    price: 7500,
    image: '/cars/car1.png',
    description: 'Extreme supercar with aggressive styling and incredible performance.',
    stats: { speed: 98, acceleration: 95, handling: 90, braking: 85 }
  },
  {
    id: 'mclaren-p1',
    name: 'McLaren P1',
    price: 9000,
    image: '/cars/car1.png',
    description: 'Hybrid hypercar combining electric and combustion power.',
    stats: { speed: 100, acceleration: 100, handling: 95, braking: 90 }
  },
  {
    id: 'audi-r8',
    name: 'Audi R8',
    price: 5500,
    image: '/cars/car1.png',
    description: 'German engineering meets Italian passion in this mid-engine supercar.',
    stats: { speed: 92, acceleration: 90, handling: 88, braking: 85 }
  },
  {
    id: 'nissan-gtr',
    name: 'Nissan GT-R',
    price: 4000,
    image: '/cars/car1.png',
    description: 'Godzilla of the automotive world with incredible all-wheel drive performance.',
    stats: { speed: 90, acceleration: 88, handling: 85, braking: 88 }
  },
  {
    id: 'mercedes-amg-gt',
    name: 'Mercedes-AMG GT',
    price: 5000,
    image: '/cars/car1.png',
    description: 'Track-focused AMG with uncompromising performance.',
    stats: { speed: 93, acceleration: 92, handling: 90, braking: 87 }
  },
  {
    id: 'ford-mustang',
    name: 'Ford Mustang',
    price: 3000,
    image: '/cars/car1.png',
    description: 'American muscle car with raw power and aggressive styling.',
    stats: { speed: 88, acceleration: 85, handling: 75, braking: 80 }
  },
  {
    id: 'chevrolet-camaro',
    name: 'Chevrolet Camaro',
    price: 2800,
    image: '/cars/car1.png',
    description: 'Classic American muscle with modern performance technology.',
    stats: { speed: 87, acceleration: 83, handling: 78, braking: 82 }
  },
  {
    id: 'dodge-challenger',
    name: 'Dodge Challenger',
    price: 3200,
    image: '/cars/car1.png',
    description: 'Pure American muscle with supercharged V8 power.',
    stats: { speed: 89, acceleration: 87, handling: 70, braking: 78 }
  },
  {
    id: 'toyota-supra',
    name: 'Toyota Supra',
    price: 3500,
    image: '/cars/car1.png',
    description: 'Legendary Japanese sports car reborn with BMW engineering.',
    stats: { speed: 86, acceleration: 84, handling: 88, braking: 85 }
  },
  {
    id: 'honda-nsx',
    name: 'Honda NSX',
    price: 4200,
    image: '/cars/car1.png',
    description: 'Japanese supercar with hybrid technology and precision handling.',
    stats: { speed: 91, acceleration: 89, handling: 92, braking: 88 }
  },
  {
    id: 'lexus-lfa',
    name: 'Lexus LFA',
    price: 6500,
    image: '/cars/car1.png',
    description: 'Rare Japanese supercar with a screaming V10 engine.',
    stats: { speed: 94, acceleration: 91, handling: 89, braking: 86 }
  },
  {
    id: 'mazda-rx7',
    name: 'Mazda RX-7',
    price: 2200,
    image: '/cars/car1.png',
    description: 'Rotary-powered sports car with perfect weight distribution.',
    stats: { speed: 82, acceleration: 80, handling: 90, braking: 75 }
  },
  {
    id: 'subaru-wrx',
    name: 'Subaru WRX',
    price: 1800,
    image: '/cars/car1.png',
    description: 'Rally-bred all-wheel drive performance sedan.',
    stats: { speed: 78, acceleration: 82, handling: 85, braking: 80 }
  },
  {
    id: 'mitsubishi-evo',
    name: 'Mitsubishi Lancer',
    price: 2000,
    image: '/cars/car1.png',
    description: 'Final evolution of the legendary rally car.',
    stats: { speed: 80, acceleration: 85, handling: 88, braking: 82 }
  },
  {
    id: 'jeep-wrangler',
    name: 'Jeep Wrangler',
    price: 1500,
    image: '/cars/car1.png',
    description: 'Ultimate off-road vehicle for any terrain adventure.',
    stats: { speed: 60, acceleration: 55, handling: 70, braking: 65 }
  },
  {
    id: 'land-rover-defender',
    name: 'Land Rover Defender',
    price: 1800,
    image: '/cars/car1.png',
    description: 'Iconic British off-roader with legendary capability.',
    stats: { speed: 65, acceleration: 60, handling: 75, braking: 70 }
  },
  {
    id: 'toyota-land-cruiser',
    name: 'Toyota Land Cruiser',
    price: 2000,
    image: '/cars/car1.png',
    description: 'Reliable luxury SUV with unmatched off-road prowess.',
    stats: { speed: 70, acceleration: 65, handling: 72, braking: 75 }
  },
  {
    id: 'rolls-royce-phantom',
    name: 'Rolls-Royce Phantom',
    price: 12000,
    image: '/cars/car1.png',
    description: 'Ultimate luxury sedan with unparalleled comfort and refinement.',
    stats: { speed: 75, acceleration: 70, handling: 65, braking: 80 }
  },
  {
    id: 'bentley-continental',
    name: 'Bentley Continental',
    price: 6000,
    image: '/cars/car1.png',
    description: 'Grand tourer combining luxury with high performance.',
    stats: { speed: 88, acceleration: 85, handling: 80, braking: 85 }
  },
  {
    id: 'aston-martin-db11',
    name: 'Aston Martin DB11',
    price: 7000,
    image: '/cars/car1.png',
    description: 'British grand tourer with James Bond sophistication.',
    stats: { speed: 90, acceleration: 87, handling: 85, braking: 88 }
  },
  {
    id: 'maserati-granturismo',
    name: 'Maserati GranTurismo',
    price: 4500,
    image: '/cars/car1.png',
    description: 'Italian grand tourer with a soul-stirring V8 soundtrack.',
    stats: { speed: 87, acceleration: 84, handling: 82, braking: 83 }
  },
  {
    id: 'porsche-911-classic',
    name: 'Porsche 911 Classic',
    price: 3500,
    image: '/cars/car1.png',
    description: 'Classic air-cooled 911 with timeless design and character.',
    stats: { speed: 80, acceleration: 75, handling: 90, braking: 78 }
  },
  {
    id: 'ferrari-250-gto',
    name: 'Ferrari 250 GTO',
    price: 15000,
    image: '/cars/car1.png',
    description: 'The most valuable car in the world with racing pedigree.',
    stats: { speed: 85, acceleration: 80, handling: 88, braking: 75 }
  },
  {
    id: 'lamborghini-miura',
    name: 'Lamborghini Miura',
    price: 8000,
    image: '/cars/car1.png',
    description: 'The first supercar that started the mid-engine revolution.',
    stats: { speed: 82, acceleration: 78, handling: 85, braking: 70 }
  },
  {
    id: 'jaguar-e-type',
    name: 'Jaguar E-Type',
    price: 4000,
    image: '/cars/car1.png',
    description: 'The most beautiful car ever made according to Enzo Ferrari.',
    stats: { speed: 75, acceleration: 70, handling: 80, braking: 65 }
  },
  {
    id: 'mercedes-300sl',
    name: 'Mercedes-Benz 300SL',
    price: 6000,
    image: '/cars/car1.png',
    description: 'Iconic gullwing doors and racing heritage.',
    stats: { speed: 78, acceleration: 72, handling: 82, braking: 70 }
  },
  {
    id: 'bmw-2002-turbo',
    name: 'BMW 2002 Turbo',
    price: 2500,
    image: '/cars/car1.png',
    description: 'The original hot hatch that started BMW\'s performance legacy.',
    stats: { speed: 72, acceleration: 75, handling: 85, braking: 70 }
  },
  {
    id: 'volkswagen-beetle',
    name: 'Volkswagen Beetle',
    price: 800,
    image: '/cars/car1.png',
    description: 'The people\'s car with timeless charm and reliability.',
    stats: { speed: 50, acceleration: 45, handling: 60, braking: 55 }
  },
  {
    id: 'ford-gt40',
    name: 'Ford GT40',
    price: 10000,
    image: '/cars/car1.png',
    description: 'American racing legend that beat Ferrari at Le Mans.',
    stats: { speed: 90, acceleration: 85, handling: 88, braking: 80 }
  }
];
