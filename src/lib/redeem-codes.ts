// Simple in-memory storage for demo purposes
// In production, you would use a proper database
const redeemCodes = new Map<string, {
  code: string;
  carId: string;
  carName: string;
  price: number;
  createdAt: Date;
  used: boolean;
  usedAt?: Date;
}>();

export function generateRedeemCode(): string {
  // Generate a 6-digit random code
  let code: string;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (redeemCodes.has(code));
  
  return code;
}

export function createRedeemCode(carId: string, carName: string, price: number): string {
  const code = generateRedeemCode();
  redeemCodes.set(code, {
    code,
    carId,
    carName,
    price,
    createdAt: new Date(),
    used: false
  });
  
  return code;
}

export function validateRedeemCode(code: string): {
  valid: boolean;
  carId?: string;
  carName?: string;
  used?: boolean;
} {
  const redeemCode = redeemCodes.get(code);
  
  if (!redeemCode) {
    return { valid: false };
  }
  
  return {
    valid: true,
    carId: redeemCode.carId,
    carName: redeemCode.carName,
    used: redeemCode.used
  };
}

export function useRedeemCode(code: string): boolean {
  const redeemCode = redeemCodes.get(code);
  
  if (!redeemCode || redeemCode.used) {
    return false;
  }
  
  redeemCode.used = true;
  redeemCode.usedAt = new Date();
  
  return true;
}

export function getAllRedeemCodes() {
  return Array.from(redeemCodes.values());
}
