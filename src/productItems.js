const products = [
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/61j4acmknmL._AC_SX355_.jpg",
    owner: "Easy Drones",
    name: "DXL drone",
    description: "Red flying drone with 1080p camera Multi-Rotor. If you want to get a small camera in the air for a short period of time, then it is hard to argue with a multi-rotor.",
    price: 128.85,
    promoPrice: 20,
    onSale: false,
    category: ["Electronics"],
    stock: 15
  },
  {
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1059&q=80",
    owner: "Omega watch",
    name: "Time Piece",
    description: "Omega watches were the choice of NASA and the first watch on the Moon in 1969 for Apollo 11 mission. In addition, Omega has been the official timekeeper of the Olympic Games since 1932.",
    price: 528.95,
    promoPrice: 10,
    onSale: true,
    category: ["Fashion","Accessories","Jewelry","Watch"],
    stock: 5
  },
  {
    img: "https://images.samsung.com/is/image/samsung/au-galaxy-tab-s7-t875-sm-t870nznaxsa-frontmysticbronze-315512007?$720_576_PNG$",
    owner: "J-Phones",
    name: "Samsung Galaxy Tab S7",
    description: "120hz LTPS LCD Display, Low latency S Pen, 8,000mAh intelligent battery",
    price: 11499.00,
    promoPrice: 0,
    onSale: false,
    category: ["Electronics","Mobile Phones"],
    stock: 8
  },
  {
    img: "https://www.skymartbw.com/wp-content/uploads/2021/03/HP-255-G8-Click-Tek.jpg",
    owner: "J-Phones",
    name: "HP Notebook 15ra011ni",
    description: "HP Notebook - 15-ra011ni. Microprocessor. Intel® Celeron® N3060 (1.6 GHz base frequency, up to 2.48 GHz burst frequency, 2 MB cache, 2 cores).",
    price: 3995.00,
    promoPrice: 0,
    onSale: false,
    category: ["Electronics","Laptop"],
    stock: 4
  },
  {
    img: "https://www.builders.co.za/media/h1e%2Fhf2%2F9558944284702.jpg",
    owner: "Clear Paints",
    name: "Pro Soft Sheen Jute Paint",
    description: "Fired Earth Painters Pro Soft Sheen - Jute White (20L). colour. Jute White. code. BW428-8-20L. pack size. 20L. new topcoat base.",
    price: 680.00,
    promoPrice: 0,
    onSale: false,
    category: ["Paint"],
    stock: 0
  },
  {
    img: "https://cdn.rona.ca/images/30855276_L.jpg",
    owner: "Deers Furniture",
    name: "Bosch Gas Burner Stove",
    description: "Bosch 4 Gas Burner Stove (600 x 600 x 850mm) Black/Silver HGA120E50Z",
    price: 7995.00,
    promoPrice: 12,
    onSale: true,
    category: ["Cooking Appliances"],
    stock: 6
  },
  {
    img: "https://www.lg.com/au/images/microwave-ovens/md07504245/gallery/Zz4.jpg",
    owner: "Deers Furniture",
    name: "LG Microwave(56L) MS5HIT",
    description: "Discover the 56L NeoChef Black Smog Microwave Oven. Featuring Smart Inverter, Even Heating & Defrosting & Anti-Bacterial EasyClean and more.",
    price: 2599.00,
    promoPrice: 12,
    onSale: true,
    category: ["Cooking Appliances"],
    stock: 45
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/415XTlnUAXL.jpg",
    owner: "Deers Furniture",
    name: "Gold 4 BAr OScillating Halogen Heater",
    description: "Goldair 4 Bar Oscillating Halogen Heater - Black (1600w). ",
    price: 460.00,
    promoPrice: 0,
    onSale: false,
    category: ["Electronics","Heater"],
    stock: 2
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0041/9115/8383/products/delonghi7finoilheater_1024x@3x.jpg?v=1591288490",
    owner: "Deers Furniture",
    name: "Delonghi KH75512 12 Fin Oil Heater",
    description: "Maximum heating power 2500W. 3 Heating settings. ComforTemp is a dedicated sensing system that will automatically maintain the ideal temperature.",
    price: 1220.00,
    promoPrice: 10,
    onSale: true,
    category: ["Electronics","Heater"],
    stock: 8
  }
]
export default products;
