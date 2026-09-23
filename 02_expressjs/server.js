import express from "express";

const app = express();
const port = 3000;
const router = express.Router();

app.use(express.json());

app.use((req , res , next) =>{
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]🔥 ${req.method} ${req.url}`);
  next();
});

let cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 25000,
  },
  {
    id: 2,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 28000,
  },
  {
    id: 3,
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 23000,
  },
];


app.get("/", (req, res) => {
  res.send("Hello from Cars API!");
});

router.get("/", (req, res) => {
  res.json(cars);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find((car) => car.id === id);
  if (!car) {
    res.status(404).send("Car not found");
    return;
  }
  res.json(car);
});

router.post("/", (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year,
    price,
  };
  cars.push(newCar);
  res.status(201).json(newCar);
});

// api/v1/cars/123
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { make, model, year, price } = req.body;
  const inddex = cars.findIndex((car) => car.id === id);

  if (inddex === -1) {
    res.status(404).json({ error: "Car not found" });
    return;
  }
  if (make) cars[inddex].make = make;
  if (model) cars[inddex].model = model;
  if (year) cars[inddex].year = year;
  if (price) cars[inddex].price = price;
  res.json(cars[inddex]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const inddex = cars.findIndex((car) => car.id === id);

  if (inddex === -1) {
    res.status(404).json({ error: "Car not found" });
    return;
  }
  const deletedCar = cars.splice(inddex, 1);
  res.json(deletedCar[0]);
});

app.use("/api/v1/cars", router);

app.listen(port, () => {
  console.log(`Server runing on http://localhost:${port}`);
});



