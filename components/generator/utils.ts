import { rankHierarchy } from"./constants"

const declensionRules: Record<string, { genitive: string; instrumental: string }> = {
 Боец: { genitive:"Бойца", instrumental:"Бойцом" },
 Курсант: { genitive:"Курсанта", instrumental:"Курсантом" },
 Инспектор: { genitive:"Инспектора", instrumental:"Инспектором" },
 Сотрудник: { genitive:"Сотрудника", instrumental:"Сотрудником" },
 Начальник: { genitive:"Начальника", instrumental:"Начальником" },
 Заместитель: { genitive:"Заместителя", instrumental:"Заместителем" },
 Первый: { genitive:"Первого", instrumental:"Первым" },
}

const departmentDeclension = {
 академии: { genitive:"ии", instrumental:"ией" },
 отряда: { genitive:"отряда", instrumental:"отрядом" },
 службы: { genitive:"службы", instrumental:"службой" },
 отдела: { genitive:"отдела", instrumental:"отделом" },
 батальона: { genitive:"батальона", instrumental:"батальоном" },
}

const declinePosition = (position: string, isVrio: boolean, caseType:"genitive" |"instrumental") => {
 if (!position) return""
 const prefix = isVrio ?"ВрИО" :""
 const title = isVrio ? position.replace(/^ВрИО /,"") : position
 const words = title.trim().split(/\s+/)
 let modifier =""
 let mainNoun = words[0]
 let department = words.slice(1).join("")

 if (["Первый","Заместитель"].includes(words[0])) {
 modifier = words[0]
 mainNoun = words[1] ||""
 department = words.slice(2).join("")
 }

 const nounDeclension = declensionRules[mainNoun] || {
 genitive: !mainNoun.endsWith("а") && !mainNoun.endsWith("о") && !mainNoun.endsWith("е") ? mainNoun +"а" : mainNoun,
 instrumental:
 !mainNoun.endsWith("а") && !mainNoun.endsWith("о") && !mainNoun.endsWith("е") ? mainNoun +"ом" : mainNoun,
 }

 let declinedDept = department
 if (
 department &&
 !["ОМОН","СОБР","ППС","ОВП","ПА","ГУВД","ГИБДД","МБ","СБ","ОБ","УБ"].some((abbr) =>
 department.includes(abbr),
 )
 ) {
 for (const [key, declension] of Object.entries(departmentDeclension)) {
 if (department.endsWith(key)) {
 declinedDept = department.replace(new RegExp(`${key}$`), declension[caseType])
 break
 }
 }
 }

 if (modifier ==="Первый") {
 return prefix + `Перв${caseType ==="genitive" ?"ого" :"ым"} Заместителя ${declinedDept}`.trim()
 } else if (modifier ==="Заместитель") {
 return prefix + `Заместителя ${declinedDept}`.trim()
 }
 return prefix + (declinedDept ? `${nounDeclension[caseType]} ${declinedDept}` : nounDeclension[caseType]).trim()
}

export const toGenitiveCase = (position: string, isVrio: boolean) => declinePosition(position, isVrio,"genitive")

export const toInstrumentalCase = (position: string, isVrio: boolean) =>
 declinePosition(position, isVrio,"instrumental")

const declineRussianLastName = (lastName: string, targetCase:"dative" |"genitive") => {
 if (!lastName) return""

 const endings = {
 dative: {
 ов:"у",
 ев:"у",
 ёв:"ёву",
 ин:"у",
 ын:"у",
 ий:"ю",
 ой:"ому",
 ый:"ому",
 ая:"ой",
 яя:"ей",
 },
 genitive: {
 ов:"а",
 ев:"а",
 ёв:"ёва",
 ин:"а",
 ын:"а",
 ий:"его",
 ой:"ого",
 ый:"ого",
 ая:"ой",
 яя:"ей",
 },
 }

 const rules = endings[targetCase]
 for (const [ending, replacement] of Object.entries(rules)) {
 if (lastName.endsWith(ending)) {
 return lastName.slice(0, -ending.length) + replacement
 }
 }

 return lastName
}

const declineRussianFirstName = (firstName: string, targetCase:"dative" |"genitive") => {
 if (!firstName) return""

 const maleEndings = {
 dative: { ий:"ию", ей:"ею", ай:"аю", я:"е", а:"е" },
 genitive: { ий:"ия", ей:"ея", ай:"ая", я:"и", а:"ы" },
 }

 const femaleEndings = {
 dative: { а:"е", я:"е", ия:"ии" },
 genitive: { а:"ы", я:"и", ия:"ии" },
 }

 const isFemale = firstName.endsWith("а") || firstName.endsWith("я")
 const rules = isFemale ? femaleEndings[targetCase] : maleEndings[targetCase]

 for (const [ending, replacement] of Object.entries(rules)) {
 if (firstName.endsWith(ending)) {
 return firstName.slice(0, -ending.length) + replacement
 }
 }

 return firstName
}

const declineRussianMiddleName = (middleName: string, targetCase:"dative" |"genitive") => {
 if (!middleName) return""
 if (targetCase ==="dative") {
 return middleName.endsWith("ич") ? middleName.slice(0, -2) +"ичу" : middleName.slice(0, -1) +"не"
 } else {
 return middleName.endsWith("ич") ? middleName.slice(0, -2) +"ича" : middleName.slice(0, -1) +"ны"
 }
}

export const declineLeaderName = (name: string, targetCase:"dative" |"genitive") => {
 if (!name) return""
 const parts = name.split("")
 if (parts.length < 2) return name

 const lastName = parts[0]
 const firstName = parts[1]
 const middleName = parts[2] ||""

 const declinedLastName = declineRussianLastName(lastName, targetCase)
 const declinedFirstName = declineRussianFirstName(firstName, targetCase)
 const declinedMiddleName = middleName ? declineRussianMiddleName(middleName, targetCase) :""

 return `${declinedLastName} ${declinedFirstName}${declinedMiddleName ?"" + declinedMiddleName :""}`.trim()
}

export const parseRanks = (rankString: string): string[] => {
 const normalizedRankString = rankString.replace("—","-")
 if (normalizedRankString.includes("-")) {
 const [start, end] = normalizedRankString.split("-").map((s) => s.trim())
 const startIndex = rankHierarchy.indexOf(start)
 const endIndex = rankHierarchy.indexOf(end)
 if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
 return rankHierarchy.slice(startIndex, endIndex + 1)
 }
 }
 return [rankString.trim()]
}

export const getNextRank = (currentRank: string): string => {
 const currentIndex = rankHierarchy.indexOf(currentRank)
 if (currentIndex !== -1 && currentIndex < rankHierarchy.length - 1) {
 return rankHierarchy[currentIndex + 1]
 }
 return""
}
