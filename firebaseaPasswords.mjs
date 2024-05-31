import { FirebaseScrypt } from 'firebase-scrypt'


async function main() {
  const firebaseParameter = {
    memCost: 14, // replace by your
    rounds: 8, // replace by your
    saltSeparator: 'Bw==', // replace by your
    signerKey: 'CdTICIHF+lvn4qfCEjzguI4aU5ByzsLpfNGoUV9k/x2DCy0f+dldEvaO5othXPyQ2of7QPK17/r8AgP1D3S4+A==', // replace by your
  }
  const scrypt = new FirebaseScrypt(firebaseParameter)
  const password = "Karensaltz1955"
  const hash = 'KWSN0xRF29oFuk+zT5NoKtQ+64lw4oeWa8uGNczj6TUSlFQVHkMrmuUJHTyjb+JVeF9VT9PpNHG0WS1DzRN2Vw=='
  const salt = "b4rF+7vEJwlzgg=="
  const isValid = await scrypt.verify(password, salt, hash)
  isValid ? console.log('Valid !') : console.log('Not valid !')
}


main().then(_ => console.log('done'))
