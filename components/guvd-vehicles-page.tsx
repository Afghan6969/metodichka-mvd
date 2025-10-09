"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Truck, Plane, X, Eye, Shield } from "lucide-react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"

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
  "Lexus IS 350": "https://i.imgur.com/x3gs4HP.jpeg",
  'Вертолет "Maverick"': "https://i.imgur.com/WP05qBK.png",
}

export default function GuvdVehiclesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string>("Приволжск")

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

  const openImageModal = (image: string | undefined) => {
    if (image) setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Получаем выбранный город или первый город по умолчанию
  const currentCityData = vehicleData.find(city => city.city === selectedCity) || vehicleData[0]
  const totalVehicles = vehicleData.reduce((sum, city) => sum + city.vehicles.length, 0)

  return (
    <div className="space-y-6 px-6 py-8 max-w-7xl mx-auto">
      <PageHeader
        icon={Shield}
        title="Автопарк ГУВД"
        description="Транспортные средства для сотрудников ГУВД"
        badge={`${totalVehicles} авто`}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {vehicleData.map((city) => (
            <Button
              key={city.city}
              variant={selectedCity === city.city ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(city.city)}
              className={selectedCity === city.city ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/40" : "border-blue-400/40 text-blue-300 hover:bg-blue-500/10"}
            >
              {city.city}
            </Button>
          ))}
        </div>

        <div className="grid gap-8">
          <div key={currentCityData.city} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">ГУВД г. {currentCityData.city}</h2>
              <p className="text-blue-200/80 text-sm mt-1">Автопарк управления внутренних дел города {currentCityData.city}</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentCityData.vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between h-full p-4 rounded-xl bg-black/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30 mt-1">
                        <div className="text-blue-300">{getVehicleIcon(vehicle.type)}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs">
                            {vehicle.rank}
                          </Badge>
                        </div>
                        {vehicle.special && (
                          <p className="text-xs text-blue-200/80 mt-2 italic">{vehicle.special}</p>
                        )}
                      </div>
                    </div>
                    {vehicle.image && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full border-blue-400/40 text-blue-300 hover:bg-blue-500/10"
                        onClick={() => openImageModal(vehicle.image)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Показать изображение
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Примечания</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-2 text-sm text-blue-100/90">
              <li>• Доступ к транспортным средствам осуществляется согласно рангу сотрудника</li>
              <li>• Специальные транспортные средства предназначены для конкретных подразделений</li>
              <li>• Вертолет доступен только сотрудникам высшего руководящего состава</li>
              <li>• Использование транспорта должно быть обосновано служебной необходимостью</li>
            </ul>
          </div>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4"
            onClick={closeImageModal}
          >
            <div className="relative max-w-4xl w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-6">
              <button
                className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-300 transition-all duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={closeImageModal}
                aria-label="Закрыть изображение"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative w-full h-[70vh] max-h-[800px]">
                <Image
                  src={selectedImage}
                  alt="Увеличенное изображение ТС"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-center text-white mt-4 font-medium">
                {Object.keys(vehicleImages).find((key) => vehicleImages[key] === selectedImage) || "Транспортное средство"}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
