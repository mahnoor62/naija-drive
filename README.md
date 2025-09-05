# Naija Drive Marketplace

A gamified car marketplace website for the Naija Drive mobile racing game. Users can purchase vehicles and receive redeem codes to unlock them in-game.

## Features

- 🎮 **Gamified UI/UX** - Clean, responsive design inspired by racing games
- 🚗 **32 Premium Vehicles** - Sports cars, luxury vehicles, classics, and supercars
- 💳 **Stripe Integration** - Secure payment processing
- 🎫 **Redeem Code System** - 6-digit codes for in-game vehicle unlocks
- 📱 **Responsive Design** - Mobile-first approach with smooth animations
- 🎨 **Custom Theme** - Primary color #202427, Secondary color #F66A25

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Payments**: Stripe
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naija-drive-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Stripe Setup

### 1. Create a Stripe Account
- Sign up at [stripe.com](https://stripe.com)
- Get your API keys from the dashboard

### 2. Configure Webhooks
- Go to Stripe Dashboard > Webhooks
- Add endpoint: `https://yourdomain.com/api/webhook`
- Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copy the webhook secret

### 3. Test Payments
- Use Stripe's test card numbers for testing
- Test card: `4242 4242 4242 4242`
- Any future expiry date and CVC

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── create-payment-intent/
│   │   └── webhook/
│   ├── success/           # Payment success page
│   ├── globals.css        # Global styles
│   └── page.tsx           # Main marketplace page
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   └── PurchaseDialog.tsx # Purchase flow component
├── data/                 # Static data
│   └── cars.ts           # Vehicle data
└── lib/                  # Utility libraries
    ├── stripe.ts         # Stripe server-side
    ├── stripe-client.ts  # Stripe client-side
    └── redeem-codes.ts   # Redeem code management
```

## Vehicle Data

The marketplace includes 32 vehicles across different categories:

- **Sports Cars**: BMW M5, Ford Mustang, Nissan GT-R, etc.
- **Supercars**: Ferrari F40, Lamborghini Aventador, McLaren P1, etc.
- **Luxury**: Rolls-Royce Phantom, Bentley Continental, Aston Martin DB11, etc.
- **Classic**: Porsche 911 Classic, Ferrari 250 GTO, Jaguar E-Type, etc.
- **Off-road**: Jeep Wrangler, Land Rover Defender, Toyota Land Cruiser, etc.

Each vehicle has:
- Unique stats (Speed, Acceleration, Handling, Braking)
- Rarity levels (Common, Rare, Epic, Legendary)
- Pricing in Nigerian Naira (₦)

## Redeem Code System

1. **Purchase Flow**: User selects vehicle → Payment via Stripe → Success
2. **Code Generation**: 6-digit unique code generated after successful payment
3. **Game Integration**: User enters code in-game to unlock vehicle
4. **Validation**: Codes are validated and marked as used

## Customization

### Colors
The theme uses your specified colors:
- Primary: `#202427` (Dark gray)
- Secondary: `#F66A25` (Orange)

### Adding New Vehicles
1. Edit `src/data/cars.ts`
2. Add new car object with required properties
3. Update the total count in documentation

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Tailwind classes
- Animations: Framer Motion

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Ensure Node.js 18+ support
- Set environment variables
- Configure Stripe webhook URL

## Production Considerations

1. **Database**: Replace in-memory storage with proper database
2. **Email Service**: Add email notifications for redeem codes
3. **Analytics**: Add tracking for purchases and user behavior
4. **Security**: Implement rate limiting and input validation
5. **Monitoring**: Add error tracking and performance monitoring

## Support

For issues or questions:
1. Check the console for error messages
2. Verify Stripe configuration
3. Ensure all environment variables are set
4. Check network connectivity for API calls

## License

This project is for the Naija Drive game marketplace. All rights reserved.