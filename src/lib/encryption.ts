import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "bible-ai-encryption-key-change-in-production";
const CONFESSION_KEY = process.env.CONFESSION_ENCRYPTION_KEY || "confession-double-encrypt-key-change-in-production";

export function encryptContent(content: string): string {
  return CryptoJS.AES.encrypt(content, ENCRYPTION_KEY).toString();
}

export function decryptContent(encryptedContent: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
}

export function doubleEncryptContent(content: string): string {
  const firstPass = CryptoJS.AES.encrypt(content, ENCRYPTION_KEY).toString();
  return CryptoJS.AES.encrypt(firstPass, CONFESSION_KEY).toString();
}

export function doubleDecryptContent(encryptedContent: string): string {
  try {
    const firstBytes = CryptoJS.AES.decrypt(encryptedContent, CONFESSION_KEY);
    const firstPass = firstBytes.toString(CryptoJS.enc.Utf8);
    const secondBytes = CryptoJS.AES.decrypt(firstPass, ENCRYPTION_KEY);
    return secondBytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
}
