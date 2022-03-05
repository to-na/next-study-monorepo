import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from '../../lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.body;
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + 1;
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);
          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);
            res.json(minifiedRecords);
          }
        } else {
          res.json({ message: 'id not found', id });
        }
      } else {
        res.status(400);
        res.json({ message: 'id is required' });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: 'error upvote', error });
    }
  } else {
    res.status(500);
    res.json({ message: 'not PUT request' });
  }
};

export default favoriteCoffeeStoreById;
