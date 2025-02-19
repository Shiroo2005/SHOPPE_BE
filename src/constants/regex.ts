export enum REGEX {
  ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER = `^(?=.*[a-zA-ZÀ-ỹ])[a-zA-ZÀ-ỹ0-9]+$`,
  ONLY_LETTER_AND_NUMBER = `^[a-zA-ZÀ-ỹ0-9]+$`
}
