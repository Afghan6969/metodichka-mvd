/**
 * Типы для системы запросов на создание аккаунта
 */

export type AccountRequestStatus = "pending" | "approved" | "rejected";

export interface AccountRequest {
  id: string;
  nickname: string;
  login: string;
  password_hash: string;
  role: string | null;
  status: AccountRequestStatus;
  comment: string | null;
  created_at: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface AccountRequestWithReviewer extends AccountRequest {
  reviewed_by_user?: {
    nickname: string;
  } | null;
}

export interface AccountRequestSubmitData {
  nickname: string;
  login: string;
  password: string;
  role?: string;
  captchaAnswer: string;
  captchaToken: string;
}

export interface AccountRequestReviewData {
  requestId: string;
  action: "approve" | "reject";
  comment?: string;
}

export interface CaptchaData {
  question: string;
  token: string;
}

export interface RateLimit {
  id: string;
  ip_address: string;
  request_count: number;
  last_request_at: string;
  blocked_until: string | null;
}

export interface AccountRequestListResponse {
  success: boolean;
  requests: AccountRequestWithReviewer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AccountRequestSubmitResponse {
  success: boolean;
  message: string;
  requestId: string;
}

export interface AccountRequestReviewResponse {
  success: boolean;
  message: string;
  request: AccountRequest;
}

export interface CaptchaResponse {
  success: boolean;
  question: string;
  token: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface RateLimitCheckResult {
  allowed: boolean;
  message?: string;
}

export interface PendingRequestCheckResult {
  hasPending: boolean;
  message?: string;
}

export interface LoginExistsCheckResult {
  exists: boolean;
  message?: string;
}
