const crypto = require("crypto");

const alg = "aes-256-ctr";
const secret_passwd = "asdasd";
const text = "1";

// Gera uma chave de 32 bytes usando a senha fornecida (ajuste para sua necessidade)
const key = crypto.scryptSync(secret_passwd, "salt", 32);

// Cria um vetor de inicialização (IV) de 16 bytes
const iv = crypto.randomBytes(16);

// Cria o objeto de cifragem
const cipher = crypto.createCipheriv(alg, key, iv);

// Criptografa o texto e transforma em base64
let crypted = cipher.update(text, "utf-8", "base64");
crypted += cipher.final("base64");

// Exibe o IV e o texto criptografado em base64 (IV é necessário para descriptografia)
console.log(`IV: ${iv.toString("hex")}`);
console.log(`Criptografado: ${crypted}`);


// Descriptografar o texto
const decipher = crypto.createDecipheriv(alg, key, iv);
let decrypted = decipher.update(crypted, 'base64', 'utf-8');
decrypted += decipher.final('utf-8');

console.log(`Descriptografado: ${decrypted}`);