// Compile-only check of lib/index.d.ts (`npm run test:types`).
import * as xmlenc from '../../lib';
import type { DecryptOptions, EncryptOptions } from '../../lib';

const encryptOptions: EncryptOptions = {
  rsa_pub: Buffer.from(''),
  pem: '',
  encryptionAlgorithm: 'http://www.w3.org/2009/xmlenc11#aes256-gcm',
  keyEncryptionAlgorithm: 'http://www.w3.org/2009/xmlenc11#rsa-oaep',
  keyEncryptionDigest: 'sha256',
  keyEncryptionMgf: 'sha256',
};
xmlenc.encrypt('<a/>', encryptOptions, (err, result) => {
  const message: string | undefined = err?.message;
  const xml: string | undefined = result;
  void message;
  void xml;
});

const decryptOptions: DecryptOptions = { key: '', disallowDecryptionWithInsecureAlgorithm: false, warnInsecureAlgorithm: false };
xmlenc.decrypt('<xenc:EncryptedData/>', decryptOptions, () => undefined);
const symmetricKey: Buffer = xmlenc.decryptKeyInfo('<KeyInfo/>', decryptOptions);
void symmetricKey;

// @ts-expect-error `key` is required
xmlenc.decrypt('<x/>', {}, () => undefined);
// @ts-expect-error `encryptionAlgorithm` is required
xmlenc.encrypt('<a/>', { rsa_pub: '', pem: '' }, () => undefined);
