export enum REGEX {
  ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER = `^(?=.*[a-zA-Z])[a-zA-Z0-9]+$`,
  ONLY_LETTER_AND_NUMBER = `^[a-zA-Z0-9]+$`
}
