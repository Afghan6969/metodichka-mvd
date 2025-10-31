export interface Violation {
 article: string
 description: string
 fine: number
 suspension: number
 suspensionRange?: { min: number; max: number }
 arrest: number
 arrestRange?: { min: number; max: number }
 retraining: boolean
 alternatives?: Array<{
 name: string
 fine: number
 fineRange?: { min: number; max: number }
 suspension: number
 arrest: number
 arrestRange?: { min: number; max: number }
 retraining: boolean
 }>
}

export interface ViolationCategory {
 name: string
 items: Record<string, Violation>
}

export interface PenaltyTotals {
 fine: number
 suspension: number
 arrest: number
 retraining: boolean
}

export interface Alternative {
 name: string
 fine: number
 suspension: number
 arrest: number
 retraining: boolean
 hasRange?: boolean
 range?: { min: number; max: number }
 hasArrestRange?: boolean
 arrestRange?: { min: number; max: number }
}
