export default class Utils {
  static generateRandomAlphanumericString(length) {
    const alphanumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
      randomString += alphanumericCharacters.charAt(randomIndex);
    }

    return randomString;
  }

  static generateRandomEmail(mailPrefixLength) {
    const randomString = Utils.generateRandomAlphanumericString(mailPrefixLength);
    const randomEmailAddress = `randomEmailAddress=${randomString}@adaptavist-test.com`;
    return randomEmailAddress;
  }
}