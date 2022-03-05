import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.json(records);
      } else {
        res.status(400);
        res.json({ message: 'id not found' });
      }
    } else {
      res.status(400);
      res.json({ message: 'id is required' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'Error! ', error });
  }
};

export default getCoffeeStoreById;
