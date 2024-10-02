const en = {
  common: {
    recordNotFound: 'No record found',
    notFound: 'Not found',
    unknownError: 'An error occurred, please try again',
    deletedSuccessfully: 'Deleted successfully',
    updatedSuccessfully: 'Successfully updated',
    createSuccessfully: 'Successfully created',
  },
  errors: {
    recordNotFound: 'No record found',
    notFound: 'Not found',
    unknownError: 'An error occurred, please try again',
    uniqueConstraint: 'Such a record already exists',
    relationViolation: 'This entry is linked to another user',
    fillRequiredFields: 'Please fill in the mandatory fields',
    recordToUpdateNotFound: 'The record to update was not found',
  },
  auth: {
    mobileNotFound: 'User with mobile number {mobile} not found',
    codeNotSent: 'There was an error sending the code, please try again',
    codeSentSuccessfully: 'The SMS code has been sent to you successfully',
    wrongCode: 'The code is invalid',
    mobileVerifiedSuccessfully: 'Mobile has been successfully verified',
    resendCode: 'The code has been resent',
    mobileAlreadyExists: 'This mobile number is already registered',
    wrongMobileNumber: 'The mobile number is incorrect',
    wrongPassword: 'The password is incorrect',
    goodbye: 'Goodbye!',
    wrongCurrentPassword: 'The current password is incorrect',
    passwordChangedSuccessfully: 'Password changed successfully',
  },
  address: {
    cityNotFound: 'The selected city was not found in the database',
    canNotDelete:
      'The address is bound to the current service. You will be able to delete the address after the end of the service',
    deletedSuccessfully: 'Address deleted successfully',
    userIdNotFound: 'The user ID is required',
    createError: 'An error occurred while creating the address',
  },
  busyTime: {
    canNotUpdate: 'The busy time is tied to the current service, you can change the time after the service is finished',
    canNotDelete: 'The busy time is tied to the current service, you can delete the time after the service ends',
    missingId: 'It is necessary to provide the ID of the cleaner or tool',
  },
  client: {
    hasOngoingOrder: 'The customer has a current order',
    deleteOrderError: 'An error occurred while deleting the order',
    deleteAddressError: 'An error occurred while deleting the address',
    deleteClientReviewError: 'An error occurred while deleting the rating',
    deleteClientError: 'An error occurred while deleting the client',
  },
  order: {
    slotTaken: 'The time is already booked...',
    orderedSuccessfully: 'Order completed successfully',
    doNotUpdateBefore: 'The order can be changed only 12 hours before the start',
    orderNotFound: 'Order not found',
    orderCancelled: 'The order was cancelled',
    deleteOrderWhileOtherExists:
      'You have a current order, you can place a new order after the current one is finished',
  },
  tool: {
    hasOngoingOrder: 'The tool has an ongoing service and cannot be removed',
  },
  employee: {
    employeeHasOngoingOrder: 'The cleaner has an ongoing service and cannot be removed',
    busyTimeDeleteError: "An error occurred when deleting an employee's busy time",
  },
  document: {
    createError: 'An error occurred while creating the document',
    getDocumentError: 'An error occurred while getting the document',
  },
  expense: {
    getExpenseError: 'An error occurred while getting the expense',
    createExpenseError: 'An error occurred while creating the expense',
  },
  chat: {
    messagesNotFound: 'Messages not found',
    chatsNotFound: 'Chats not found',
  }
};

export default en;
