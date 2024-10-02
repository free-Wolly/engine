const ka = {
  common: {
    recordNotFound: 'ჩანაწერი არ მოიძებნა',
    notFound: 'არ მოიძებნა',
    unknownError: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან',
    deletedSuccessfully: 'წარმატებით წაიშალა',
    updatedSuccessfully: 'წარმატებით განახლდა',
    createSuccessfully: 'წარმატებით შეიქმნა',
  },
  errors: {
    recordNotFound: 'ჩანაწერი არ მოიძებნა',
    notFound: 'არ მოიძებნა',
    unknownError: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან',
    uniqueConstraint: 'ასეთი ჩანაწერი უკვე არსებობს',
    relationViolation: 'ეს ჩანაწერი სხვასთან არის დაკავშირებული',
    fillRequiredFields: 'გთხოვთ სავალდებულო შეავსოთ ველები',
    recordToUpdateNotFound: 'ჩანაწერი რომელიც უნდა განახლდეს არ მოიძებნა',
  },
  auth: {
    mobileNotFound: 'მომხმარებელი მობილურის ნომრით {mobile} არ მოიძებნა',
    codeNotSent: 'კოდის გაგზავნისას დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან',
    codeSentSuccessfully: 'სმს კოდი წარმატებით გაგიზავნა',
    wrongCode: 'კოდი არასწორია',
    mobileVerifiedSuccessfully: 'მობილური წარმატებით დადასტურდა',
    mobileAlreadyExists: 'ეს ნომერი უკვე რეგისტრირებულია',
    wrongMobileNumber: 'მობილურის ნომერი არასწორია',
    wrongPassword: 'პაროლი არასწორია',
    goodbye: 'ნახვამდის!',
    wrongCurrentPassword: 'მიმდინარე პაროლი არასწორია',
    passwordChangedSuccessfully: 'პაროლი წარმატებით შეიცვალა',
  },
  address: {
    cityNotFound: 'არჩეული ქალაქი ბაზაში არ მოიძებნა',
    canNotDelete: 'მისამართი მიბმულია მიმდინარე სერვისს. მისამართის წაშლას შეძლებთ სერვისის დასრულების შემდეგ',
    deletedSuccessfully: 'მისამართი წარმატებით წაიშალა',
    userIdNotFound: 'მომხმარებლის ID არ მოიძებნა',
    createError: 'მისამართის შექმნისას შეცდომა',
  },
  busyTime: {
    canNotUpdate: 'დაკავებული დრო მიბმულია მიმდინარე სერვისს, დროის შეცვლას შეძლებთ სერვისის დასრულების შემდეგ',
    canNotDelete: 'დაკავებული დრო მიბმულია მიმდინარე სერვისს, დროის წაშლას შეძლებთ სერვისის დასრულების შემდეგ',
    missingId: 'აუცილებელია გადმოსცეთ ID დამლაგებლის ან ხელსაწყოსი',
  },
  client: {
    hasOngoingOrder: 'თქვენ გაქვთ მიმდინარე შეკვეთა, ანგარიშის გაუქმებას შეძლებთ შეკვეთის დასრულების შემდეგ',
    deleteOrderError: 'შეკვეთის წაშლისას დაფიქსირდა შეცდომა',
    deleteAddressError: 'მისამართის წაშლისას დაფიქსირდა შეცდომა',
    deleteClientReviewError: 'რეიტინგის წაშლისას დაფიქსირდა შეცდომა',
    deleteClientError: 'კლიენტის წაშლისას დაფიქსირდა შეცდომა',
  },
  order: {
    slotTaken: 'დრო უკვე დაიჯავშნა...',
    orderedSuccessfully: 'შეკვეთა წარმატებით დასრულდა',
    doNotUpdateBefore: 'შეკვეთის ცვლილება შესაძლებელია მხოლოდ დაწყებამდე 12 საათით ადრე',
    orderNotFound: 'შეკვეთა არ მოიძებნა',
    orderCancelled: 'შეკვეთა გაუქმდა',
    deleteOrderWhileOtherExists:
      'თქვენ გაქვთ მიმდინარე შეკვეთა, ახალი შეკვეთის გაკეთებას შეძლებთ მიმდინარეს დასრულების შემდეგ',
  },
  tool: {
    hasOngoingOrder: 'ხელსაწყოს აქვს მიმდინარე სერვისი და ვერ შეძლებთ წაშლას',
  },
  employee: {
    employeeHasOngoingOrder: 'დამლაგებელს აქვს მიმდინარე სერვისი და ვერ შეძლებთ წაშლას',
    busyTimeDeleteError: 'დასაქმებულის დაკავებული დროის წაშლისას დაფიქსირდა შეცდომა',
  },
  chat: {
    newMessage: 'თქვენ მიიღეთ ახალი შეტყობინება',
    messagesNotFound: 'შეტყობინებები არ მოიძებნა',
    chatsNotFound: 'ჩატები არ მოიძებნა',
  },
  document: {
    createError: 'დოკუმენტის შექმნისას დაფიქსირდა შეცდომა',
    getDocumentError: 'დოკუმენტის მოძებნისას დაფიქსირდა შეცდომა',
  },
  expense: {
    getExpenseError: 'ხარჯის მოძებნისას დაფიქსირდა შეცდომა',
    createExpenseError: 'ხარჯის შექმნისას დაფიქსირდა შეცდომა',
  },
};

export default ka;
