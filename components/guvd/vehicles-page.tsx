"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Truck, Plane, Bike, X, Eye } from "lucide-react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"

interface Vehicle {
  name: string
  rank: string
  type: "car" | "truck" | "helicopter" | "motorcycle"
  maxSpeed?: number
  trunkCapacity?: number
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
    { name: "Lada Priora", rank: "2+ ранг", type: "car", maxSpeed: 204, trunkCapacity: 10, image: vehicleImages["Lada Priora"] },
    { name: "Chevrolet Cruze", rank: "2+ ранг", type: "car", maxSpeed: 223, trunkCapacity: 10, image: vehicleImages["Chevrolet Cruze"] },
    { name: "УАЗ Патриот", rank: "3+ ранг", type: "car", maxSpeed: 160, trunkCapacity: 10, image: vehicleImages["УАЗ Патриот"] },
    { name: "Toyota Camry", rank: "4+ ранг", type: "car", maxSpeed: 234, trunkCapacity: 10, image: vehicleImages["Toyota Camry"] },
    { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car", maxSpeed: 266, trunkCapacity: 15, image: vehicleImages["Audi Q7 TDI"] },
    { name: "Audi S8 Plus", rank: "6+ ранг", type: "car", maxSpeed: 331, trunkCapacity: 10, image: vehicleImages["Audi S8 Plus"] },
    { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car", maxSpeed: 235, trunkCapacity: 15, image: vehicleImages["Toyota Land Cruiser 200"] },
    { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок", maxSpeed: 133, image: vehicleImages["ПАЗ-320405-04"] },
    { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"', maxSpeed: 129, image: vehicleImages["ГАЗель БИЗНЕС"] },
    { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter", image: vehicleImages['Вертолет "Maverick"'] },
  ],
},
{
  city: "Мирный",
  vehicles: [
    { name: "Lada Priora", rank: "2+ ранг", type: "car", maxSpeed: 204, trunkCapacity: 10, image: vehicleImages["Lada Priora"] },
    { name: "Volkswagen Polo", rank: "2+ ранг", type: "car", maxSpeed: 216, trunkCapacity: 10, image: vehicleImages["Volkswagen Polo"] },
    { name: "УАЗ Патриот", rank: "3+ ранг", type: "car", maxSpeed: 160, trunkCapacity: 10, image: vehicleImages["УАЗ Патриот"] },
    { name: "Audi A3", rank: "4+ ранг", type: "car", maxSpeed: 249, trunkCapacity: 10, image: vehicleImages["Audi A3"] },
    { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car", maxSpeed: 266, trunkCapacity: 15, image: vehicleImages["Audi Q7 TDI"] },
    { name: "Audi S8 Plus", rank: "6+ ранг", type: "car", maxSpeed: 331, trunkCapacity: 10, image: vehicleImages["Audi S8 Plus"] },
    { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car", maxSpeed: 235, trunkCapacity: 15, image: vehicleImages["Toyota Land Cruiser 200"] },
    { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок", maxSpeed: 133, image: vehicleImages["ПАЗ-320405-04"] },
    { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"', maxSpeed: 129, image: vehicleImages["ГАЗель БИЗНЕС"] },
    { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter", image: vehicleImages['Вертолет "Maverick"'] },
  ],
},
{
  city: "Невский",
  vehicles: [
    { name: "Lada Priora", rank: "2+ ранг", type: "car", maxSpeed: 204, trunkCapacity: 10, image: vehicleImages["Lada Priora"] },
    { name: "Kia Rio", rank: "2+ ранг", type: "car", maxSpeed: 217, trunkCapacity: 10, image: vehicleImages["Kia Rio"] },
    { name: "УАЗ Патриот", rank: "3+ ранг", type: "car", maxSpeed: 160, trunkCapacity: 10, image: vehicleImages["УАЗ Патриот"] },
    { name: "Lexus IS 350", rank: "4+ ранг", type: "car", maxSpeed: 275, trunkCapacity: 10, image: vehicleImages["Lexus IS 350"] },
    { name: "Audi Q7 TDI", rank: "5+ ранг", type: "car", maxSpeed: 266, trunkCapacity: 15, image: vehicleImages["Audi Q7 TDI"] },
    { name: "Audi S8 Plus", rank: "6+ ранг", type: "car", maxSpeed: 331, trunkCapacity: 10, image: vehicleImages["Audi S8 Plus"] },
    { name: "Toyota Land Cruiser 200", rank: "7+ ранг", type: "car", maxSpeed: 235, trunkCapacity: 15, image: vehicleImages["Toyota Land Cruiser 200"] },
    { name: "ПАЗ-320405-04", rank: "5+ ранг", type: "truck", special: "для мероприятий, сборов, тренировок", maxSpeed: 133, image: vehicleImages["ПАЗ-320405-04"] },
    { name: "ГАЗель БИЗНЕС", rank: "5+ ранг", type: "truck", special: 'для подразделения "ОМОН/СОБР"', maxSpeed: 129, image: vehicleImages["ГАЗель БИЗНЕС"] },
    { name: 'Вертолет "Maverick"', rank: "8+ ранг", type: "helicopter", image: vehicleImages['Вертолет "Maverick"'] },
      ],
    },
  ]

  const getVehicleIcon = (type: Vehicle["type"]) => {
    switch (type) {
      case "car":
        return <Car className="h-4 w-4" />
      case "truck":
        return <Truck className="h-4 w-4" />
      case "helicopter":
        return <Plane className="h-4 w-4" />
      default:
        return <Car className="h-4 w-4" />
    }
  }

  const currentCityData = vehicleData.find(city => city.city === selectedCity) || vehicleData[0]
  const totalVehicles = vehicleData.reduce((sum, city) => sum + city.vehicles.length, 0)

  return (
    <div className="space-y-4 px-4 py-6 max-w-7xl mx-auto">
      <PageHeader
        icon={Car}
        title="Автопарк ГУВД"
        description="Специализированный транспорт для оперативного реагирования и поддержания правопорядка"
        badge={`${totalVehicles} единиц техники`}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="grid gap-6">
          <div key={currentCityData.city} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">ГУВД г. {currentCityData.city}</h2>
              <p className="text-blue-200/80 text-sm mt-1">Автопарк управления внутренних дел города {currentCityData.city}</p>
            </div>
            <div className="p-4">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {currentCityData.vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/6 via-white/4 to-white/2 border border-white/10 hover:border-white/20 hover:from-white/10 hover:via-white/6 hover:to-white/4 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm flex flex-col ${vehicle.type === 'helicopter' ? 'h-36' : 'h-full'}`}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-4 flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-3">
                        {/* Compact Vehicle Icon */}
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/15 to-blue-600/15 rounded-lg flex items-center justify-center border border-blue-400/20 group-hover:border-blue-300/40 transition-all duration-300 flex-shrink-0">
                          <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300 text-sm">
                            {getVehicleIcon(vehicle.type)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm mb-1 leading-tight group-hover:text-blue-100 transition-colors duration-300">
                            {vehicle.name}
                          </h3>

                          {/* Compact Rank Badge */}
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="border-blue-400/30 text-blue-300 bg-blue-500/8 text-xs font-medium px-1.5 py-0.5">
                              {vehicle.rank}
                            </Badge>
                          </div>

                          {/* Compact Specs Grid */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {vehicle.maxSpeed && (
                              <div className="flex items-center gap-2 p-1.5 bg-black/8 rounded-md border border-white/8 group-hover:border-white/15 transition-all duration-300">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/20 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs text-blue-200/70 font-medium leading-none mb-0.5">Макс. скорость</p>
                                  <p className="text-xs font-bold text-white leading-none">{vehicle.maxSpeed} км/ч</p>
                                </div>
                              </div>
                            )}

                            {vehicle.trunkCapacity && (
                              <div className="flex items-center gap-2 p-1.5 bg-black/8 rounded-md border border-white/8 group-hover:border-white/15 transition-all duration-300">
                                <div className="w-2 h-2 bg-amber-400 rounded-full shadow-sm shadow-amber-400/20 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs text-blue-200/70 font-medium leading-none mb-0.5">Багажник</p>
                                  <p className="text-xs font-bold text-white leading-none">{vehicle.trunkCapacity} {vehicle.trunkCapacity === 1 ? 'слот' : 'слотов'}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Compact Special notes */}
                          {vehicle.special && (
                            <div className="mb-3 p-2 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-md border border-blue-400/15 group-hover:border-blue-300/25 transition-all duration-300">
                              <div className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-blue-300 rounded-full mt-2 shadow-sm shadow-blue-300/30 flex-shrink-0" />
                                <p className="text-xs text-blue-100/90 leading-relaxed">
                                  {vehicle.special}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="flex-grow" />

                      {/* Compact Image Button */}
                      {vehicle.image && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-white/15 bg-white/3 hover:bg-white/8 text-white hover:text-blue-100 transition-all duration-300 mt-auto text-xs py-1.5"
                          onClick={() => vehicle.image && setSelectedImage(vehicle.image)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Фото
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl group hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Примечания</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-1.5 text-sm text-blue-100/90">
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
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-4">
              <button
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-300 transition-all duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setSelectedImage(null)}
                aria-label="Закрыть изображение"
              >
                <X className="h-4 w-4" />
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
              <p className="text-center text-white mt-3 font-medium text-sm">
                {Object.keys(vehicleImages).find((key) => vehicleImages[key] === selectedImage) || "Транспортное средство"}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
