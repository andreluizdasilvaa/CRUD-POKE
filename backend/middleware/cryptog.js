const { error } = require("console");
const crypto = require("crypto");

const alg = 'aes-256-ctr';
const secret_passwd = process.env.secret;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const key = crypto.scryptSync(secret_passwd, "salt", 32);
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function incrypt(text) {
    const iv = crypto.randomBytes(16); // Mover a geração do IV para dentro da função
    const cipher = crypto.createCipheriv(alg, key, iv);
    let crypted = cipher.update(text, "utf8", "base64");
    crypted += cipher.final("base64");
    return iv.toString("base64") + ":" + crypted; // Armazenar o IV junto com o texto
}

function decrypt(text) {
    
    if (!text || typeof text !== "string" || !text.includes(":")) {
        throw new Error("Texto para descriptografar é inválido");
    }

    const [ivText, encryptedText] = text.split(":");
    const iv = Buffer.from(ivText, "base64");
    const decipher = crypto.createDecipheriv(alg, key, iv);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}


module.exports = { incrypt, decrypt };