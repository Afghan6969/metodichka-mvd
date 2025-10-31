export interface Position {
 title: string
 rank: string
 level: string
}

export interface DepartmentPositions {
 [key: string]: Position[]
}

export interface Requirement {
 req: string
 quantity?: string
 link: string
}

export type ReportType ="promotion" |"reprimand" |"senior" |"leader"
export type Department ="ГУВД" |"ГИБДД"
