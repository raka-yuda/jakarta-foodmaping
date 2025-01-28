// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import { useEffect } from 'react'
// import type { LatLngTuple } from 'leaflet'
// import { cn } from '@/lib/utils'

// // Fix icon types
// // if (L.Icon.Default.imagePath) {
// //   L.Icon.Default.imagePath = 'leaflet/images/'
// // }

// // Fix marker paths
// L.Icon.Default.mergeOptions({
//   iconUrl: '/images/marker-icon.png',
//   iconRetinaUrl: '/images/marker-icon-2x.png',
//   shadowUrl: '/images/marker-shadow.png',
// })

// interface Restaurant {
//   id: number
//   name: string
//   coords: LatLngTuple
//   rating: number
// };

// const restaurants: Restaurant[] = [
//   { id: 1, name: "Pizza Place", coords: [51.505, -0.09], rating: 4.5 },
//   { id: 2, name: "Burger Joint", coords: [51.51, -0.1], rating: 4.0 },
// ]

// interface Props {
//   className?: String;
//   restaurants?: Restaurant[] | [];
// }

// // const LeafletMap = ({ className, restaurants }: Props) => {
// //   // const defaultCenter: LatLngTuple = [51.505, -0.09]
// //   const defaultCenter: LatLngTuple = [-6.200000, 106.816666]

// //   // return typeof window !== 'undefined' ? (
// //   //   <MapContainer className={"max-h-[420px]"} center={defaultCenter} zoom={13}>
// //   //     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //   //     {restaurants.map(restaurant => (
// //   //       <Marker key={restaurant.id} position={restaurant.coords}>
// //   //         <Popup>{restaurant.name} - Rating: {restaurant.rating}</Popup>
// //   //       </Marker>
// //   //     ))}
// //   //   </MapContainer>
// //   // ) : null

// //   return typeof window !== 'undefined' ? (
// //     <div className={cn("h-[600px] w-full rounded-lg shadow-lg overflow-hidden", className)}>
// //       <MapContainer center={defaultCenter} zoom={13} className="h-full w-full">
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //         {restaurants && restaurants.map(restaurant => (
// //           <Marker key={restaurant.id} position={restaurant.coords}>
// //             <Popup className="text-sm font-medium">
// //               {restaurant.name} - Rating: {restaurant.rating}
// //             </Popup>
// //           </Marker>
// //         ))}
// //       </MapContainer>
// //     </div>
// //   ) : null
// // }

// const UpdateMarkers = ({ restaurants }: { restaurants: Restaurant[] }) => {
//   const map = useMap();

//   useEffect(() => {
//     // Clear existing markers if necessary
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Marker) {
//         map.removeLayer(layer);
//       }
//     });

//     // Add new markers
//     restaurants.forEach((restaurant) => {
//       const marker = L.marker(restaurant.coords).addTo(map);
//       marker.bindPopup(
//         `<div class="text-sm font-medium">${restaurant.name} - Rating: ${restaurant.rating}</div>`
//       );
//     });
//   }, [restaurants, map]);

//   return null;
// };

// const LeafletMap = ({ className, restaurants = [] }: Props) => {
//   const defaultCenter: LatLngTuple = [-6.219999, 106.887666];

//   return typeof window !== 'undefined' ? (
//     <div className={cn('h-[320px] w-full rounded-lg shadow-lg overflow-hidden z-10', className)}>
//       <MapContainer center={defaultCenter} zoom={12} className="h-full w-full">
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <UpdateMarkers restaurants={restaurants} />
//       </MapContainer>
//     </div>
//   ) : null;
// };

// export default LeafletMap

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import type { LatLngTuple } from 'leaflet';
import { cn } from '@/lib/utils';

// Fix marker paths
L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
});

interface Restaurant {
  id: number;
  name: string;
  coords: LatLngTuple;
  rating: number;
}

interface Props {
  className?: string;
  restaurants?: Restaurant[] | [];
}

// Helper to calculate the center
const calculateCenter = (restaurants: Restaurant[]): LatLngTuple => {
  if (restaurants.length === 0) return [0, 0]; // Fallback for empty list

  const totalLat = restaurants.reduce((sum, restaurant) => sum + restaurant.coords[0], 0);
  const totalLng = restaurants.reduce((sum, restaurant) => sum + restaurant.coords[1], 0);

  return [totalLat / restaurants.length, totalLng / restaurants.length];
};

const UpdateMarkers = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const map = useMap();

  useEffect(() => {
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    restaurants.forEach((restaurant) => {
      const marker = L.marker(restaurant.coords).addTo(map);
      marker.bindPopup(
        `<div class="text-sm font-medium">${restaurant.name} - Rating: ${restaurant.rating}</div>`
      );
    });

    // Recalculate center and set view
    if (restaurants.length > 0) {
      const center = calculateCenter(restaurants);
      map.setView(center, map.getZoom());
    }
  }, [restaurants, map]);

  return null;
};

const LeafletMap = ({ className, restaurants = [] }: Props) => {
  const defaultCenter: LatLngTuple = [0, 0]; // Initial fallback center

  return typeof window !== 'undefined' ? (
    <div className={cn('h-[320px] w-full rounded-lg shadow-lg overflow-hidden !z-10', className)}>
      <MapContainer center={defaultCenter} zoom={14} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UpdateMarkers restaurants={restaurants} />
      </MapContainer>
    </div>
  ) : null;
};

export default LeafletMap;
