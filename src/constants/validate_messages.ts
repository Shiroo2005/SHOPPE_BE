export const VALIDATE_MESSAGES = {
  //EMAIL
  EMAIL_NOT_EMPTY: 'Email_must_be_not_empty',
  EMAIL_INVALID: 'Email is invalid',
  EMAIL_EXISTS: 'Email already exists',

  //USERNAME
  USERNAME_MIN_LENGTH_AND_LETTER: 'Username must contain at least 4 chars and 1 letter',
  USERNAME_EXISTS: 'Username already exists',
  USERNAME_REQUIRED: 'Username is required',

  EMAIL_OR_USERNAME_EXISTS: 'Email or username already exists',

  //PASSWORD
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_STRONG: 'Password must contain at least 8 chars and 1 uppercase letter',

  // FULLNAME
  FULLNAME_MIN_LENGTH_AND_LETTER: 'Fullname must contain at least 4 chars and 1 letter',

  //Login
  LOGIN_FAILED: 'Username or password is incorrect',

  // ACCESS TOKEN
  ACCESS_TOKEN_INVALID: 'Access token is invalid',
  ACCESS_TOKEN_EXPIRED: 'Access token expired',

  // REFRESH TOKEN
  REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_EXPIRED: 'Refresh token expired',
  REFRESH_ACCESS_TOKEN_NOT_MATCH: 'Refresh token not match with access token',
  REFRESH_TOKEN_INVALID: 'Refresh token is invalid',

  //VALIDATION
  VALIDATE_ERROR: 'Validate error',

  //CATEGORY
  CATEGORY_PARENT_ID_INVALID: 'Parent id is invalid',
  CATEGORY_PARENT_ID_NOT_FOUND: 'Parent id not found',
  CATEGORY_ID_INVALID: 'Id is invalid',
  CATEGORY_ID_NOT_FOUND: 'Id not found',
  CATEGORY_ID_MUST_DIFFERENT_PARENT_ID: 'Id must different with parent id',

  //Name Category
  CATEGORY_NAME_REQUIRED: `Name's category is required`,
  CATEGORY_NAME_INVALID: 'Contain only letter and number',

  INVALID_URL: 'Invalid URL format',
  IMAGE_URL_INVALID_FORMAT: 'Image URL must end with .jpg, .jpeg, .png, .gif, or .webp',

  //Variant
  VARIANT_ARRAY_REQUIRED: 'Variant array is required',
  VARIANT_TITLE_REQUIRED: 'Title is required',
  VARIANT_TITLE_REGEX: 'Only letter number and must contain at least 1 letter',
  VARIANT_CHOICES_REQUIRED: 'Choices is required',
  VARIANT_CHOICE_REGEX: 'Choice contain only letter and number',

  //Product
  PRODUCT_TITLE_REX: 'Title product contain only letter, number and must contain at least 1 letter',
  PRODUCT_CATEGORY_NOT_EMPTY: 'Category can not empty',
  PRODUCT_VARIANT_NOT_EMPTY: 'Variant can not empty',
  PRODUCT_CHOICES_ARRAY: 'Choices must be an array',
  PRODUCT_CHOICES_NOT_EMPTY: 'Choice can not empty',
  PRODUCT_CHOICES_ITEM_NOT_EMPTY: 'Choice item can not empty',
  PRODUCT_CHOICES_ITEM_INVALID: 'Choice item invalid',
  PRODUCT_VARIANT_IS_ARRAY: 'Variant must an array',
  PRODUCT_ITEM_IS_ARRAY: 'Product item must an array',
  PRODUCT_ITEM_NOT_EMPTY: 'Product item can not empty',
  PRODUCT_CATEGORY_IS_INVALID: 'Product category must be an Object Id',
  PRODUCT_CATEGORY_NOT_FOUND: 'Product category not found',
  PRODUCT_VARIANT_INVALID: 'Product variant must be an Object Id',
  PRODUCT_VARIANT_NOT_FOUND: 'Product variant not found',
  PRODUCT_DESCRIPTION_INVALID: 'Product description invalid',

  //Common
  MIN_LENGTH_4: 'Min length can not lower than 4',
  CONTAIN_ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_AT_LEAST_1_LETTER:
    'Contain only letter, number and must contain at least 1 letter',
  MAX_LENGTH_100: 'Max length is 100',
  MIN_LENGTH: 'Min length can not lower than',
  MAX_LENGTH: 'Max length is',
  PRICE_POSITIVE: 'Price must be a positive number',
  STOCK_NON_NEGATIVE: 'Stock can not be a negative number',
  SOLD_NON_NEGATIVE: 'Sold can not be a negative number',
  IMAGE_STRING: 'Image must be a string',
  IMAGE_NOT_EMPTY: 'Image is required'
}
