import { table, getMinifiedRecords } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id = "${id}"`,
          })
          .firstPage();
        if (findCoffeeStoreRecords.length !== 0) {
          res.json(getMinifiedRecords(findCoffeeStoreRecords));
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json({ message: 'create a record', records });
          } else {
            res.status(400);
            res.json({ message: 'name is required' });
          }
        }
      } else {
        res.status(400);
        res.json({ message: 'id is required' });
      }
    } catch (error) {
      console.error('Error creating or find store: ', error);
      res.status(500);
      res.json({ error: error.message });
    }
  }
};

export default createCoffeeStore;
