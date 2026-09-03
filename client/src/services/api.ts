import { 
  HealthResponse, 
  UserProfile, 
  OnboardingFormData, 
  AgentAnalysisReport, 
  Opportunity,
  OpportunityMatchResult,
  OpportunityMatchResponse,
  DashboardData,
  AgentServiceItem,
  PaymentTransaction,
  X402PaymentRequest,
  PremiumReportResult,
  ApiResponse 
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch backend API health status
 */
export async function getHealthStatus(): Promise<HealthResponse> {
  const url = `${API_BASE_URL}/api/health`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Save user profile (POST /api/profile)
 */
export async function saveProfile(data: OnboardingFormData): Promise<ApiResponse<UserProfile>> {
  const url = `${API_BASE_URL}/api/profile`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Server error (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch user profile by ID (GET /api/profile/:id)
 */
export async function fetchProfile(id: string): Promise<ApiResponse<UserProfile>> {
  const url = `${API_BASE_URL}/api/profile/${id}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch profile (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch user profile by Email (GET /api/profile?email=...)
 */
export async function fetchProfileByEmail(email: string): Promise<ApiResponse<UserProfile>> {
  const url = `${API_BASE_URL}/api/profile?email=${encodeURIComponent(email)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Profile not found for ${email}`);
  }

  return response.json();
}

/**
 * Run autonomous agent analysis on user profile (POST /api/agent/analyze)
 */
export async function runAgentAnalysis(profile: UserProfile): Promise<ApiResponse<AgentAnalysisReport>> {
  const url = `${API_BASE_URL}/api/agent/analyze`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Agent analysis failed (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch existing agent analysis by User ID (GET /api/agent/analysis/:userId)
 */
export async function fetchAgentAnalysis(userId: string): Promise<ApiResponse<AgentAnalysisReport>> {
  const url = `${API_BASE_URL}/api/agent/analysis/${userId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `No analysis found for ${userId}`);
  }

  return response.json();
}

/**
 * Fetch all opportunities without personalized matching (GET /api/opportunities)
 */
export async function fetchOpportunities(): Promise<ApiResponse<Opportunity[]>> {
  const url = `${API_BASE_URL}/api/opportunities`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch opportunities (${response.status})`);
  }

  return response.json();
}

/**
 * Run AI Opportunity Matching against a user profile (POST /api/opportunities/match)
 */
export async function fetchMatchedOpportunities(profile?: UserProfile | null): Promise<OpportunityMatchResponse> {
  const url = `${API_BASE_URL}/api/opportunities/match`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile || {}),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to match opportunities (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch single opportunity by ID (GET /api/opportunities/:id)
 */
export async function fetchOpportunityById(id: string): Promise<ApiResponse<Opportunity>> {
  const url = `${API_BASE_URL}/api/opportunities/${id}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Opportunity not found (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch consolidated dashboard data (POST /api/dashboard or GET /api/dashboard/:userId)
 */
export async function fetchDashboardData(profile?: UserProfile | null): Promise<ApiResponse<DashboardData>> {
  const url = `${API_BASE_URL}/api/dashboard`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile || {}),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to load dashboard data (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch available premium agent services catalog (GET /api/payments/services)
 */
export async function fetchAgentServices(): Promise<ApiResponse<AgentServiceItem[]>> {
  const url = `${API_BASE_URL}/api/payments/services`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to load agent services (${response.status})`);
  }

  return response.json();
}

/**
 * Process x402 payment settlement (POST /api/payments/process)
 */
export async function processX402Payment(request: X402PaymentRequest): Promise<ApiResponse<any>> {
  const url = `${API_BASE_URL}/api/payments/process`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Payment processing failed (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch premium service result (GET /api/payments/result/:serviceId)
 */
export async function fetchPremiumReport(serviceId: string): Promise<ApiResponse<PremiumReportResult>> {
  const url = `${API_BASE_URL}/api/payments/result/${serviceId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to load premium report (${response.status})`);
  }

  return response.json();
}

export { API_BASE_URL };
