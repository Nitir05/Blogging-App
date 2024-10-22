const { connect } = require("mongoose");

const connectToDB = async (dbURL) => {
    return await connect(dbURL);
};

module.exports = {
    connectToDB,
};
