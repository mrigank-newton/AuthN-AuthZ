const bcrypt = require('bcrypt');

async function generateHash(pwd) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);
    return hashedPassword;
}

module.exports = generateHash;

// const hash1 = generateHash();
// const hash2 = generateHash();