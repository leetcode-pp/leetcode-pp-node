const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const iv = Buffer.alloc(16, "-");
const secret = process.env.secret;
module.exports = {
  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secret.slice(0, 32), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString("hex");
  },
  decrypt(content) {
    const decipher = crypto.createDecipheriv(
      algorithm,
      secret.slice(0, 32),
      iv
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(content, "hex")),
      decipher.final(),
    ]);
    return decrpyted.toString();
  },
};
