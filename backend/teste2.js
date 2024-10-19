const crypto = require('crypto');

const alg = 'aes-256-ctr';
const secret_passwd = 'senhaParaCriptografar';
const text = 'texto_a_ser_sescriptografado';

// gera uma chave de 32 bytes/caracteres usando a secret_passwd, pois o algoritimo utilizado necessita de 32 bytes( nem + nem - ), por isso utilizamos o "salt" para garantir isso.
const key = crypto.scryptSync(secret_passwd, "salt", 32);

// cria um vetor de 16 bytes unico toda vez que é iniciado, para garatir que o texto criptografado seja o mesmo quando gerado novamente.
const iv = crypto.randomBytes(16);

// cria um objeto de cifragem, onde definimos qual criptografia vamos usar, a chave gerada acima com a 'secret_passwd' e o vetor de 16bytes/caracteres aleatorios criado antes
const cipher = crypto.createCipheriv(alg, key, iv);

// aqui onde nos realmente criptografamos o texto, ( o codigo anterior é para expecificar/preparar como vai funcionar a criptografia ).
// passamos o objeto de cifragem( onde está todas as informações para realizar a criptografia ), com o metodo .update, com o texto a ser criptografado, o valor que está esse texto( em utf8 se refere a string que são letras, numeros, caracteres simbolos etc.. ), e o formato para retornar esse texto ( base64 => retorna binario em uma sequencia de caracteres, simbolos etc.. );
let crypted = cipher.update(text, "utf8", "binary");

// para finalizar teremos que incrementar os dados que não foram criptografados( os blocos que sobraram, pois esse alg separa os blocos de 16 em 16 bytes )
crypted += cipher.final("binary");

// exibimos os texto criptografado
console.log(crypted);

// =-=-=- | DESCRIPTOGRAFIA | =-=-=-


const decipher = crypto.createDecipheriv(alg, key, iv);

let decrypted = decipher.update(crypted, "binary", "utf8")
decrypted += decipher.final("utf8")

// texto descriptografado
console.log(decrypted)