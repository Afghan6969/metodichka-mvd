"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Truck, Plane, Bike } from "lucide-react"

interface Vehicle {
  name: string
  rank: string
  type: "car" | "truck" | "helicopter" | "motorcycle"
  special?: string
}

interface CityVehicles {
  city: string
  vehicles: Vehicle[]
}

export function GibddVehiclesPage() {
  const vehicleData: CityVehicles[] = [
    {
      city: "Приволжск",
      vehicles: [
        { name: "Lada Vesta", rank: "2+ ранг", type: "car" },
        { name: "Skoda Octavia", rank: "2+ ранг", type: "car" },
        { name: "Volkswagen Touareg", rank: "3+ ранг", type: "car" },
        { name: "BMW M5 (E60)", rank: "4+ ранг", type: "car" },
        { name: "Mercedes-Benz E63 S AMG (W212)", rank: "6+ ранг", type: "car" },
        { name: "Lexus LX570", rank: "7+ ранг", type: "car" },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок" },
        { name: "BMW R1200", rank: "6+ ранг", type: "motorcycle", special: 'для подразделения "Мотобат"' },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter" },
      ],
    },
    {
      city: "Мирный",
      vehicles: [
        { name: "Lada Vesta", rank: "2+ ранг", type: "car" },
        { name: "Skoda Octavia", rank: "2+ ранг", type: "car" },
        { name: "Volkswagen Touareg", rank: "3+ ранг", type: "car" },
        { name: "Mercedes-Benz C63 AMG (W204)", rank: "4+ ранг", type: "car" },
        { name: "BMW M5 (F90)", rank: "6+ ранг", type: "car" },
        { name: "Lexus LX570", rank: "7+ ранг", type: "car" },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок" },
        { name: "BMW R1200", rank: "6+ ранг", type: "motorcycle", special: 'для подразделения "Мотобат"' },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter" },
      ],
    },
    {
      city: "Невский",
      vehicles: [
        { name: "Lada Vesta", rank: "2+ ранг", type: "car" },
        { name: "Skoda Octavia", rank: "2+ ранг", type: "car" },
        { name: "Volkswagen Touareg", rank: "3+ ранг", type: "car" },
        { name: "Kia Stinger", rank: "4+ ранг", type: "car" },
        { name: "Mercedes-Benz S AMG (W213)", rank: "6+ ранг", type: "car" },
        { name: "Lexus LX570", rank: "7+ ранг", type: "car" },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок" },
        { name: "BMW R1200", rank: "6+ ранг", type: "motorcycle", special: 'для подразделения "Мотобат"' },
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
      case "motorcycle":
        return <Bike className="h-5 w-5" />
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Автопарк ГИБДД</h1>
          <p className="text-muted-foreground">
            Транспортные средства, доступные сотрудникам ГИБДД по рангам
          </p>
        </div>

        <div className="grid gap-8">
          {vehicleData.map((cityData) => (
            <Card key={cityData.city} className="border-border">
              <CardHeader className="bg-secondary/10">
                <CardTitle className="text-xl text-primary">ГИБДД г. {cityData.city}</CardTitle>
                <CardDescription>
                  Автопарк Государственной инспекции безопасности дорожного движения города {cityData.city}
                </CardDescription>
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
                        <h3 className="font-medium text-sm text-foreground truncate">{vehicle.name}</h3>
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
              <li>• Мотоциклы BMW R1200 предназначены исключительно для подразделения "Мотобат"</li>
              <li>• Высокопроизводительные автомобили используются для преследования нарушителей</li>
              <li>• Вертолет доступен только сотрудникам высшего руководящего состава</li>
              <li>• Использование транспорта должно быть обосновано служебной необходимостью</li>
            </ul>
          </CardContent>
        </Card>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Разработано{" "}
              <a
                href="https://vk.com/id503251431"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Poseidon_Wagner
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
