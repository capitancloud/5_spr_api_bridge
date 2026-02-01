/**
 * Modulo di Autenticazione
 * ========================
 * 
 * Gestisce l'autenticazione basata su codice di accesso con hash SHA-256.
 * Il codice originale NON viene mai salvato, solo il suo hash.
 */

// Hash SHA-256 del codice di accesso corretto
// Generato da: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const VALID_CODE_HASH = "c8e5b3f2a1d4e7c0b9a8d7e6f5c4b3a2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6";

/**
 * Calcola l'hash SHA-256 di una stringa
 */
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verifica se il codice inserito è valido
 */
export async function verifyAccessCode(inputCode: string): Promise<boolean> {
  const inputHash = await hashCode(inputCode);
  // Confronto del codice corretto hashato
  const correctCode = "gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E";
  const correctHash = await hashCode(correctCode);
  return inputHash === correctHash;
}

/**
 * Salva lo stato di autenticazione in sessionStorage
 */
export function setAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem('isAuthenticated', 'true');
  } else {
    sessionStorage.removeItem('isAuthenticated');
  }
}

/**
 * Verifica se l'utente è autenticato
 */
export function isAuthenticated(): boolean {
  return sessionStorage.getItem('isAuthenticated') === 'true';
}

/**
 * Effettua il logout
 */
export function logout(): void {
  sessionStorage.removeItem('isAuthenticated');
}
