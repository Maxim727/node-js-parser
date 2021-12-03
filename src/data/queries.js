const getData = "SELECT * FROM parseddata";
const getDataById = "SELECT * FROM parseddata WHERE id = $1";

const checkDataExists = "SELECT s FROM parseddata s WHERE s.inflation = $1";
const addData = "INSERT INTO parseddata (inflation, brent) VALUES ($1, $2)";
const deleteData = "DELETE FROM parseddata WHERE id = $1"
const updateData = "UPDATE parseddata SET inflation = $1, brent = $2 WHERE id = $3"

module.exports = {
    getData,
    getDataById,
    checkDataExists,
    addData,
    deleteData,
    updateData
}