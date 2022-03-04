import { fetchCoffeeStores } from '../../lib/coffeeStores';

const getCoffeeStoresByLocation = async (req, res) => {
  // configuer latlong and limit
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, 30);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: error.message });
  }
};

export default getCoffeeStoresByLocation;
