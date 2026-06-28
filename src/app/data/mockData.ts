export interface Estate {
  id: string;
  name: string;
  location: string;
  county: string;
  area: string;
  titleDeedNumber: string;
  management: string;
  email: string;
  phone: string;
  amenities: string[];
  photo: string;
  approved: boolean;
  description: string;
}

export interface House {
  id: string;
  estateId: string;
  houseNumber: string;
  area: string;
  rent: number;
  amenities: string[];
  photos: string[];
  bedrooms: number;
  bathrooms: number;
  floor: number;
  type: string;
  isVacant: boolean;
  description: string;
  status?: "vacant" | "occupied"; // New field: vacant (default) or occupied
  occupiedDate?: string; // New field: ISO date string when marked as occupied
}

export const KENYA_COUNTIES = [
  "All Counties",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Uasin Gishu",
  "Kiambu",
  "Machakos",
  "Meru",
  "Kakamega",
  "Kisii",
  "Nyeri",
  "Embu",
  "Kericho",
  "Garissa",
  "Kilifi",
  "Kwale",
  "Taita Taveta",
  "Lamu",
  "Malindi",
];

export const mockEstates: Estate[] = [
  {
    id: "est1",
    name: "Greenview Gardens",
    location: "Kilimani, Nairobi",
    county: "Nairobi",
    area: "12 acres",
    titleDeedNumber: "LR/NBI/12345/2019",
    management: "Greenview Properties Ltd",
    email: "info@greenviewgardens.co.ke",
    phone: "+254 712 345 678",
    amenities: [
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Parking",
      "CCTV",
      "Children's Play Area",
      "Backup Generator",
    ],
    photo: "https://images.unsplash.com/photo-1630241466166-22e43156d8c0?w=800",
    approved: true,
    description:
      "A premium residential estate nestled in the heart of Kilimani, offering modern living in a serene environment with world-class amenities.",
  },
  {
    id: "est2",
    name: "Mombasa Azure Heights",
    location: "Nyali, Mombasa",
    county: "Mombasa",
    area: "8 acres",
    titleDeedNumber: "LR/MSA/54321/2020",
    management: "Azure Properties Kenya",
    email: "hello@azureheights.co.ke",
    phone: "+254 733 456 789",
    amenities: [
      "Ocean View",
      "Swimming Pool",
      "24/7 Security",
      "Parking",
      "Gym",
      "Restaurant",
      "Fibre Internet",
    ],
    photo: "https://images.unsplash.com/photo-1738007709959-4b029d0c5708?w=800",
    approved: true,
    description:
      "Experience coastal living at its finest with breathtaking ocean views and premium amenities at Mombasa Azure Heights.",
  },
  {
    id: "est3",
    name: "Westlands Premier",
    location: "Westlands, Nairobi",
    county: "Nairobi",
    area: "6.5 acres",
    titleDeedNumber: "LR/NBI/67890/2021",
    management: "Premier Estates Ltd",
    email: "info@westlandspremier.co.ke",
    phone: "+254 722 567 890",
    amenities: [
      "Co-working Space",
      "Rooftop Garden",
      "24/7 Security",
      "EV Charging",
      "Gym",
      "Concierge",
      "Smart Home",
    ],
    photo: "https://images.unsplash.com/photo-1673902249309-940a9f0871cd?w=800",
    approved: true,
    description:
      "Redefining urban living in Westlands with smart home technology, co-working spaces, and premium lifestyle amenities.",
  },
  {
    id: "est4",
    name: "Kisumu Lakeside Court",
    location: "Milimani, Kisumu",
    county: "Kisumu",
    area: "10 acres",
    titleDeedNumber: "LR/KSM/11111/2022",
    management: "Lakeside Properties Kenya",
    email: "info@lakesidekisumu.co.ke",
    phone: "+254 700 111 222",
    amenities: [
      "Lake View",
      "Swimming Pool",
      "24/7 Security",
      "Parking",
      "Tennis Court",
      "Backup Generator",
    ],
    photo: "https://images.unsplash.com/photo-1630241466166-22e43156d8c0?w=800",
    approved: true,
    description:
      "Enjoy scenic Lake Victoria views in a tranquil, well-secured estate in the heart of Milimani, Kisumu.",
  },
  {
    id: "est5",
    name: "Nakuru Highlands Estate",
    location: "Section 58, Nakuru",
    county: "Nakuru",
    area: "15 acres",
    titleDeedNumber: "LR/NKR/22222/2020",
    management: "Highlands Properties Ltd",
    email: "info@nakuruhighlands.co.ke",
    phone: "+254 700 333 444",
    amenities: [
      "24/7 Security",
      "Parking",
      "Children's Play Area",
      "CCTV",
      "Backup Generator",
      "Green Spaces",
    ],
    photo: "https://images.unsplash.com/photo-1738007709959-4b029d0c5708?w=800",
    approved: true,
    description:
      "Affordable, spacious living in Nakuru with excellent security and family-friendly amenities in a growing urban hub.",
  },
  {
    id: "est6",
    name: "Kiambu Royal Gardens",
    location: "Ruiru, Kiambu",
    county: "Kiambu",
    area: "20 acres",
    titleDeedNumber: "LR/KBU/33333/2021",
    management: "Royal Gardens Kenya Ltd",
    email: "info@royalgardens.co.ke",
    phone: "+254 700 555 666",
    amenities: [
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Mall Access",
      "School Nearby",
      "Hospital Nearby",
      "Parking",
    ],
    photo: "https://images.unsplash.com/photo-1673902249309-940a9f0871cd?w=800",
    approved: true,
    description:
      "A vast, family-centered estate in Ruiru offering affordable housing with excellent access to schools, hospitals, and shopping centres.",
  },
];

export const mockHouses: House[] = [
  {
    id: "h1",
    estateId: "est1",
    houseNumber: "A-101",
    area: "85 sqm",
    rent: 55000,
    amenities: [
      "Balcony",
      "En-suite Master",
      "BIC",
      "DSTV Point",
      "High-speed Internet",
    ],
    photos: [
      "https://images.unsplash.com/photo-1764921587464-f3cdd46fb4c9?w=800",
      "https://images.unsplash.com/photo-1658595149174-ff76486ec800?w=800",
    ],
    bedrooms: 2,
    bathrooms: 2,
    floor: 1,
    type: "Apartment",
    isVacant: true,
    status: "vacant",
    description:
      "Elegant 2-bedroom apartment with a beautiful balcony view of the estate gardens. Fully fitted kitchen and modern finishes throughout.",
  },
  {
    id: "h2",
    estateId: "est1",
    houseNumber: "B-203",
    area: "120 sqm",
    rent: 85000,
    amenities: [
      "Balcony",
      "En-suite Master",
      "BIC",
      "DSTV Point",
      "Study Room",
      "High-speed Internet",
    ],
    photos: [
      "https://images.unsplash.com/photo-1764921587475-866c1d48dc48?w=800",
      "https://images.unsplash.com/photo-1692690134767-90bcc75d5653?w=800",
    ],
    bedrooms: 3,
    bathrooms: 2,
    floor: 2,
    type: "Apartment",
    isVacant: true,
    status: "vacant",
    description:
      "Spacious 3-bedroom apartment with a dedicated study room, perfect for families or professionals working from home.",
  },
  {
    id: "h3",
    estateId: "est1",
    houseNumber: "C-305",
    area: "60 sqm",
    rent: 38000,
    amenities: ["Balcony", "BIC", "DSTV Point", "High-speed Internet"],
    photos: [
      "https://images.unsplash.com/photo-1734362815901-24bdeb199da5?w=800",
    ],
    bedrooms: 1,
    bathrooms: 1,
    floor: 3,
    type: "Studio Plus",
    isVacant: false,
    status: "occupied",
    description:
      "Cozy 1-bedroom unit ideal for singles or couples, with a compact but well-designed layout and modern fittings.",
  },
  {
    id: "h4",
    estateId: "est2",
    houseNumber: "OV-401",
    area: "110 sqm",
    rent: 95000,
    amenities: [
      "Ocean View Balcony",
      "En-suite Master",
      "BIC",
      "Air Conditioning",
      "High-speed Internet",
      "Dishwasher",
    ],
    photos: [
      "https://images.unsplash.com/photo-1658595149174-ff76486ec800?w=800",
      "https://images.unsplash.com/photo-1764921587464-f3cdd46fb4c9?w=800",
    ],
    bedrooms: 3,
    bathrooms: 2,
    floor: 4,
    type: "Penthouse Suite",
    isVacant: true,
    status: "vacant",
    description:
      "Breathtaking penthouse suite with panoramic ocean views, premium finishes, and air conditioning throughout.",
  },
  {
    id: "h5",
    estateId: "est2",
    houseNumber: "B-102",
    area: "75 sqm",
    rent: 62000,
    amenities: [
      "Garden View Balcony",
      "BIC",
      "Air Conditioning",
      "High-speed Internet",
    ],
    photos: [
      "https://images.unsplash.com/photo-1692690134767-90bcc75d5653?w=800",
      "https://images.unsplash.com/photo-1764921587475-866c1d48dc48?w=800",
    ],
    bedrooms: 2,
    bathrooms: 1,
    floor: 1,
    type: "Apartment",
    isVacant: true,
    status: "vacant",
    description:
      "Fresh 2-bedroom apartment overlooking the estate gardens, with modern fittings and air conditioning.",
  },
  {
    id: "h6",
    estateId: "est3",
    houseNumber: "T-802",
    area: "145 sqm",
    rent: 130000,
    amenities: [
      "Rooftop Terrace Access",
      "Smart Home System",
      "En-suite Master",
      "BIC",
      "Fibre Internet",
      "EV Charger Point",
    ],
    photos: [
      "https://images.unsplash.com/photo-1764921587475-866c1d48dc48?w=800",
      "https://images.unsplash.com/photo-1658595149174-ff76486ec800?w=800",
    ],
    bedrooms: 3,
    bathrooms: 3,
    floor: 8,
    type: "Premium Apartment",
    isVacant: true,
    status: "vacant",
    description:
      "Top-floor premium apartment with rooftop terrace access, integrated smart home system, and the finest finishes in Westlands.",
  },
  {
    id: "h7",
    estateId: "est3",
    houseNumber: "M-402",
    area: "65 sqm",
    rent: 72000,
    amenities: [
      "Co-working Access",
      "Smart Home System",
      "BIC",
      "Fibre Internet",
    ],
    photos: [
      "https://images.unsplash.com/photo-1734362815901-24bdeb199da5?w=800",
      "https://images.unsplash.com/photo-1764921587464-f3cdd46fb4c9?w=800",
    ],
    bedrooms: 1,
    bathrooms: 1,
    floor: 4,
    type: "Smart Studio",
    isVacant: true,
    status: "vacant",
    description:
      "Compact smart studio designed for urban professionals, with integrated smart home tech and co-working space access.",
  },
  {
    id: "h8",
    estateId: "est4",
    houseNumber: "LV-301",
    area: "95 sqm",
    rent: 58000,
    amenities: [
      "Lake View Balcony",
      "En-suite Master",
      "BIC",
      "High-speed Internet",
      "Parking",
    ],
    photos: [
      "https://images.unsplash.com/photo-1764921587464-f3cdd46fb4c9?w=800",
      "https://images.unsplash.com/photo-1692690134767-90bcc75d5653?w=800",
    ],
    bedrooms: 2,
    bathrooms: 2,
    floor: 3,
    type: "Apartment",
    isVacant: true,
    status: "vacant",
    description:
      "Beautiful 2-bedroom with an unobstructed view of Lake Victoria. Serene, spacious and professionally finished.",
  },
];
