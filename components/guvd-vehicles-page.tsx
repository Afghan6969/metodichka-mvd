"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Truck, Plane, X, Eye } from "lucide-react"
import Image from "next/image"

interface Vehicle {
  name: string
  rank: string
  type: "car" | "truck" | "helicopter"
  special?: string
  image?: string
}

interface CityVehicles {
  city: string
  vehicles: Vehicle[]
}

const vehicleImages: Record<string, string> = {
  "Lada Priora": "https://i.imgur.com/icHiznz.png",
  "Chevrolet Cruze": "https://i.imgur.com/dTDaEMk.png",
  "УАЗ Патриот": "https://i.imgur.com/74UGLKH.png",
  "Toyota Camry": "https://i.imgur.com/qnb98kN.png",
  "Audi Q7 TDI": "https://i.imgur.com/RHcc7we.png",
  "Audi S8 Plus": "https://i.imgur.com/1JKIku7.png",
  "Toyota Land Cruiser 200": "https://i.imgur.com/2OOac9m.png",
  "ПАЗ-320405-04": "https://i.imgur.com/qbomzqO.png",
  "ГАЗель БИЗНЕС": "https://i.imgur.com/9kPZDqN.png",
  "Volkswagen Polo": "https://i.imgur.com/249R8BH.png",
  "Audi A3": "https://i.imgur.com/bQc9yE9.png",
  "Kia Rio": "https://i.imgur.com/jHHZlaj.jpeg",
  "Lexus IS 350": "https://i.imgur.com/9kPZDqN.png",
  'Вертолет "Maverick"': "https://i.imgur.com/x3gs4HP.jpeg",
}

export function GuvdVehiclesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const vehicleData: CityVehicles[] = [
    {
      city: "Приволжск",
      vehicles: [
        { name: "Lada Priora", rank: "2+ ранг", type: "car", image: vehicleImages["Lada Priora"] },
        { name: "Chevrolet Cruze", rank: "2+ ранг", type: "car", image: vehicleImages["Chevrolet Cruze"] },
        { name: "УАЗ Патриот", rank: "3+ ранг", type: "car", image: vehicleImages["УАЗ Патриот"] },
        { name: "Toyota Camry", rank: "4+ ранг", type: "car", image: vehicleImages["Toyota Camry"] },
        { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car", image: vehicleImages["Audi Q7 TDI"] },
        { name: "Audi S8 Plus", rank: "6+ ранг", type: "car", image: vehicleImages["Audi S8 Plus"] },
        { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car", image: vehicleImages["Toyota Land Cruiser 200"] },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок", image: vehicleImages["ПАЗ-320405-04"] },
        { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"', image: vehicleImages["ГАЗель БИЗНЕС"] },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter", image: vehicleImages['Вертолет "Maverick"'] },
      ],
    },
    {
      city: "Мирный",
      vehicles: [
        { name: "Lada Priora", rank: "2+ ранг", type: "car", image: vehicleImages["Lada Priora"] },
        { name: "Volkswagen Polo", rank: "2+ ранг", type: "car", image: vehicleImages["Volkswagen Polo"] },
        { name: "УАЗ Патриот", rank: "3+ ранг", type: "car", image: vehicleImages["УАЗ Патриот"] },
        { name: "Audi A3", rank: "4+ ранг", type: "car", image: vehicleImages["Audi A3"] },
        { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car", image: vehicleImages["Audi Q7 TDI"] },
        { name: "Audi S8 Plus", rank: "6+ ранг", type: "car", image: vehicleImages["Audi S8 Plus"] },
        { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car", image: vehicleImages["Toyota Land Cruiser 200"] },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок", image: vehicleImages["ПАЗ-320405-04"] },
        { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"', image: vehicleImages["ГАЗель БИЗНЕС"] },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter", image: vehicleImages['Вертолет "Maverick"'] },
      ],
    },
    {
      city: "Невский",
      vehicles: [
        { name: "Lada Priora", rank: "2+ ранг", type: "car", image: vehicleImages["Lada Priora"] },
        { name: "Kia Rio", rank: "2+ ранг", type: "car", image: vehicleImages["Kia Rio"] },
        { name: "УАЗ Патриот", rank: "3+ ранг", type: "car", image: vehicleImages["УАЗ Патриот"] },
        { name: "Lexus IS 350", rank: "4+ ранг", type: "car", image: vehicleImages["Lexus IS 350"] },
        { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car", image: vehicleImages["Audi Q7 TDI"] },
        { name: "Audi S8 Plus", rank: "6+ ранг", type: "car", image: vehicleImages["Audi S8 Plus"] },
        { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car", image: vehicleImages["Toyota Land Cruiser 200"] },
        { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок", image: vehicleImages["ПАЗ-320405-04"] },
        { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"', image: vehicleImages["ГАЗель БИЗНЕС"] },
        { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter", image: vehicleImages['Вертолет "Maverick"'] },
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
    const rankNumber = parseInt(rank)
    if (rankNumber <= 2) return "bg-gray-100 text-gray-800"
    if (rankNumber <= 4) return "bg-blue-100 text-blue-800"
    if (rankNumber <= 6) return "bg-green-100 text-green-800"
    if (rankNumber <= 7) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const openImageModal = (image: string) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
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
                <CardTitle className="text-xl text-primary">ГУВД г. {cityData.city}</CardTitle>
                <CardDescription>Автопарк управления внутренних дел города {cityData.city}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cityData.vehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between h-full p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
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
                      {vehicle.image && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full"
                          onClick={() => openImageModal(vehicle.image)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Показать изображение
                        </Button>
                      )}
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

        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4">
            <div className="relative max-w-4xl w-full bg-background border border-border rounded-lg shadow-lg p-6 animate-scale-in">
              <button
                className="absolute top-4 right-4 text-foreground hover:text-primary"
                onClick={closeImageModal}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative w-full h-[70vh] max-h-[800px]">
                <Image
                  src={selectedImage}
                  alt="Увеличенное изображение ТС"
                  fill
                  className="object-contain rounded-md"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-center text-foreground mt-4 font-medium">
                {Object.keys(vehicleImages).find((key) => vehicleImages[key] === selectedImage) || "Транспортное средство"}
              </p>
            </div>
          </div>
        )}
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

      <style jsx>{`
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}