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

  //Product
  PRODUCT_TITLE_REGEX: 'Product title invalid',
  PRODUCT_TITLE_LENGTH: 'Title length must at least 4 letter and lower than 100 ',
  PRODUCT_CATEGORY_ARRAY: 'Product category must be an array',
  PRODUCT_CATEGORY_NOT_EMPTY: 'Product category can not empty',
  PRODUCT_CATEGORY_INVALID: 'Product category invalid',
  PRODUCT_CATEGORY_NOT_FOUND: 'Product category not found',
  PRODUCT_DESC_LENGTH: 'Description length must at least 20 letter and lower than 200',
  PRODUCT_DESC_STRING: 'Product description must be a string',
  PRODUCT_VARIANT_INVALID: 'Product variant invalid',
  PRODUCT_VARIANT_NOT_FOUND: 'Product variant not found',

  //Product Item
  PRODUCT_ITEM_ARRAY: 'Product item must be an array',
  PRODUCT_ITEM_NOT_EMPTY: 'Product item can not be empty',
  PRICE_POSITIVE: 'Price must higher than 0',
  STOCK_NON_NEGATIVE: 'Stock can not negative',
  SOLD_NON_NEGATIVE: 'Sold can not negative',
  IMAGE_STRING: 'Image must a string',
  IMAGE_NOT_EMPTY: 'Image can not empty',
  PRODUCT_CHOICES_ARRAY: 'Product choices must be an array',
  PRODUCT_CHOICES_ITEM_INVALID: 'Product choices item invalid',
  PRODUCT_CHOICES_NUMBER_MATCH: 'The number of choices must match the number of variants'
}
