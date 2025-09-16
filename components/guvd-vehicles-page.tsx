"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Truck, Plane } from "lucide-react"

interface Vehicle {
  name: string
  rank: string
  type: "car" | "truck" | "helicopter"
  special?: string
}

interface CityVehicles {
  city: string
  vehicles: Vehicle[]
}

export function GuvdVehiclesPage() {
  const vehicleData: CityVehicles[] = [
    {
      city: "Приволжск",
      vehicles: [
        { name: "Lada Priora", rank: "2+ ранг", type: "car" },
        { name: "Chevrolet Cruze", rank: "2+ ранг", type: "car" },
        { name: "УАЗ Патриот", rank: "3+ ранг", type: "car" },
        { name: "Toyota Camry", rank: "4+ ранг", type: "car" },
        { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car" },
        { name: "Audi S8 Plus", rank: "6+ ранг", type: "car" },
        { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car" },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок" },
        { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"' },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter" },
      ],
    },
    {
      city: "Мирный",
      vehicles: [
        { name: "Lada Priora", rank: "2+ ранг", type: "car" },
        { name: "Volkswagen Polo", rank: "2+ ранг", type: "car" },
        { name: "УАЗ Патриот", rank: "3+ ранг", type: "car" },
        { name: "Audi A3", rank: "4+ ранг", type: "car" },
        { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car" },
        { name: "Audi S8 Plus", rank: "6+ ранг", type: "car" },
        { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car" },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок" },
        { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"' },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter" },
      ],
    },
    {
      city: "Невский",
      vehicles: [
        { name: "Lada Priora", rank: "2+ ранг", type: "car" },
        { name: "Kia Rio", rank: "2+ ранг", type: "car" },
        { name: "УАЗ Патриот", rank: "3+ ранг", type: "car" },
        { name: "Lexus IS 350", rank: "4+ ранг", type: "car" },
        { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car" },
        { name: "Audi S8 Plus", rank: "6+ ранг", type: "car" },
        { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car" },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок" },
        { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"' },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter" },
      ],
    },
  ]

  const getVehicleIcon = (type: Vehicle["type"]) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5" />
      case "truck":
        return <Truck className="h-5 w-5" />
      case "helicopter":
        return <Plane className="h-5 w-5" />
      default:
        return <Car className="h-5 w-5" />
    }
  }

  const getRankColor = (rank: string) => {
    const rankNumber = Number.parseInt(rank)
    if (rankNumber <= 2) return "bg-gray-100 text-gray-800"
    if (rankNumber <= 4) return "bg-blue-100 text-blue-800"
    if (rankNumber <= 6) return "bg-green-100 text-green-800"
    if (rankNumber <= 7) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Автопарк ГУВД</h1>
          <p className="text-muted-foreground">
            Транспортные средства, доступные сотрудникам ГУВД по рангам и должностям
          </p>
        </div>

        <div className="grid gap-8">
          {vehicleData.map((cityData) => (
            <Card key={cityData.city} className="border-border">
              <CardHeader className="bg-secondary/10">
                <CardTitle className="text-xl text-secondary">ГУВД г. {cityData.city}</CardTitle>
                <CardDescription>Автопарк управления внутренних дел города {cityData.city}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cityData.vehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-primary mt-1">{getVehicleIcon(vehicle.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getRankColor(vehicle.rank)}>{vehicle.rank}</Badge>
                        </div>
                        {vehicle.special && (
                          <p className="text-xs text-muted-foreground mt-2 italic">{vehicle.special}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Примечания</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Доступ к транспортным средствам осуществляется согласно рангу сотрудника</li>
              <li>• Специальные транспортные средства предназначены для конкретных подразделений</li>
              <li>• Вертолет доступен только сотрудникам высшего руководящего состава</li>
              <li>• Использование транспорта должно быть обосновано служебной необходимостью</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
