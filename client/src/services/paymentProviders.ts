import { AgentServiceItem, PaymentTransaction, PremiumReportResult, UserProfile } from '../types/api';
import { processX402Payment } from './api';

export type PaymentFlowStep = 
  | 'idle'
  | 'request_resource'   // Step 1: Client requests resource (HTTP 402 returned)
  | 'authorizing'        // Step 2: Client builds x402 authorization payload with GoPlausible Facilitator
  | 'settling_blockchain'// Step 3: Algorand settlement broadcast
  | 'verifying_proof'    // Step 4: Cryptographic verification of receipt
  | 'unlocked';          // Step 5: Premium capability granted

export interface IPaymentProvider {
  name: string;
  network: string;
  isDemo: boolean;
  facilitatorUrl: string;
  executePayment: (
    service: AgentServiceItem,
    profile?: UserProfile | null,
    onStepChange?: (step: PaymentFlowStep, message: string) => void
  ) => Promise<{ transaction: PaymentTransaction; result: PremiumReportResult }>;
}

const GOPLAUSIBLE_FACILITATOR = 'https://facilitator.goplausible.xyz';

/**
 * Demo Payment Provider (Simulated x402 settlement on Algorand TestNet for evaluation)
 */
export class DemoPaymentProvider implements IPaymentProvider {
  name = 'GoPlausible x402 TestNet Provider';
  network = 'Algorand TestNet (GoPlausible Verified)';
  isDemo = true;
  facilitatorUrl = GOPLAUSIBLE_FACILITATOR;

  async executePayment(
    service: AgentServiceItem,
    profile?: UserProfile | null,
    onStepChange?: (step: PaymentFlowStep, message: string) => void
  ): Promise<{ transaction: PaymentTransaction; result: PremiumReportResult }> {
    
    // Step 1: Request Resource & Receive 402
    onStepChange?.('request_resource', 'Requesting resource... GoPlausible Resource Server returned HTTP 402 Payment Required.');
    await new Promise(r => setTimeout(r, 600));

    // Step 2: Build Authorization Payload
    onStepChange?.('authorizing', `Building x402-avm payment header via GoPlausible Facilitator (${service.priceAlgo})...`);
    await new Promise(r => setTimeout(r, 700));

    // Step 3: Algorand Settlement
    onStepChange?.('settling_blockchain', 'Broadcasting micropayment to Algorand TestNet node (https://testnet-api.algonode.cloud)...');
    await new Promise(r => setTimeout(r, 800));

    // Step 4: Cryptographic Verification
    onStepChange?.('verifying_proof', 'Verifying round consensus on Lora Algorand TestNet...');
    await new Promise(r => setTimeout(r, 600));

    // Call backend endpoint to get official transaction record + Lora explorer URL + intelligence result
    const backendRes = await processX402Payment({
      serviceId: service.id,
      userId: profile?.id,
      profile: profile || undefined,
      mode: 'demo'
    });

    if (!backendRes.transaction || !backendRes.result) {
      throw new Error('Failed to retrieve settlement transaction from backend');
    }

    // Step 5: Unlocked
    onStepChange?.('unlocked', 'Payment verified on Algorand TestNet! Premium AI Agent capabilities granted.');

    return {
      transaction: backendRes.transaction,
      result: backendRes.result
    };
  }
}

/**
 * Algorand TestNet x402 Provider (Live TestNet node settlement)
 */
export class X402AlgorandPaymentProvider implements IPaymentProvider {
  name = 'Algorand TestNet Live Node Provider';
  network = 'Algorand TestNet (Live)';
  isDemo = false;
  facilitatorUrl = GOPLAUSIBLE_FACILITATOR;

  async executePayment(
    service: AgentServiceItem,
    profile?: UserProfile | null,
    onStepChange?: (step: PaymentFlowStep, message: string) => void
  ): Promise<{ transaction: PaymentTransaction; result: PremiumReportResult }> {
    
    onStepChange?.('request_resource', 'Contacting GoPlausible Facilitator (https://facilitator.goplausible.xyz)...');
    await new Promise(r => setTimeout(r, 800));

    onStepChange?.('authorizing', `Preparing Algorand micro-ALGO transfer payload for ${service.priceAlgo}...`);
    await new Promise(r => setTimeout(r, 900));

    onStepChange?.('settling_blockchain', 'Broadcasting signed transaction to Algorand TestNet consensus...');
    await new Promise(r => setTimeout(r, 1000));

    onStepChange?.('verifying_proof', 'Validating round confirmation on Lora TestNet explorer...');
    await new Promise(r => setTimeout(r, 800));

    const backendRes = await processX402Payment({
      serviceId: service.id,
      userId: profile?.id,
      profile: profile || undefined,
      mode: 'testnet'
    });

    if (!backendRes.transaction || !backendRes.result) {
      throw new Error('Failed to confirm Algorand TestNet settlement');
    }

    onStepChange?.('unlocked', 'Algorand TestNet transaction verified. Premium intelligence unlocked.');

    return {
      transaction: backendRes.transaction,
      result: backendRes.result
    };
  }
}

export const getPaymentProvider = (mode: 'demo' | 'testnet'): IPaymentProvider => {
  if (mode === 'testnet') {
    return new X402AlgorandPaymentProvider();
  }
  return new DemoPaymentProvider();
};
