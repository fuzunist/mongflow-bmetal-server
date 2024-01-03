const insert = (data) => {
  return process.pool.query(
    "INSERT INTO recipematerialstocks(material, cost, stock) VALUES($1, $2, $3) RETURNING *",
    [data.material, 0, 0]
  );
};

const checkExistingMaterial = async (material) => {
  const query = 'SELECT * FROM recipematerialstocks WHERE material = $1';
  const result = await process.pool.query(query, [material]);

  return result.rows.length > 0;
};

const getAll = () => {
  return process.pool.query("SELECT * FROM recipematerialstocks ORDER BY id DESC ");
};

const updateEach = async (id, data) => {
  const columns = Object.keys(data).join(", "); // Get column names dynamically
  const setValues = Object.keys(data)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", "); // Create SET values

  const query = `UPDATE recipematerialstocks SET ${setValues} WHERE id = $${
    Object.keys(data).length + 1
  } RETURNING *`;
  const values = [...Object.values(data), id];

  return process.pool.query(query, values);
};

const insertLog = (data) => {
  return process.pool.query(
    "INSERT INTO recipemateriallogs(item_id, date, price, quantity, last_edited_by) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [
      data.item_id,
      data.date,
      parseFloat(data.price),
      data.quantity,
      data.last_edited_by,
    ]
  );
};

const getAllLogs = () => {
  return process.pool.query(
    "SELECT * FROM recipemateriallogs ORDER BY date ASC"
  );
};

const updateEachLog = async (id, data) => {
  console.log("update each log id, data", id, data);
  const columns = Object.keys(data).join(", "); // Get column names dynamically
  const setValues = Object.keys(data)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", "); // Create SET values

  const query = `UPDATE recipemateriallogs SET ${setValues} WHERE id = $${
    Object.keys(data).length + 1
  } RETURNING *`;
  const values = [...Object.values(data), id];

  return process.pool.query(query, values);
};

module.exports = {
  getAll,
  updateEach,
  insert,
  insertLog,
  updateEachLog,
  getAllLogs,
  checkExistingMaterial
};
