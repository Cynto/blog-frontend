export const validateCreationForm = (
  data: any,
  content: string,
  successCallback: Function,
  errorCallback: Function
) => {
  let errorsArr: {
    value: String;
    msg: String;
    param: String;
    location: String;
  }[] = [];
  const { title, image, tags, published, featured } = data;

  if (!title.value && !errorsArr.find((e) => e.param === 'title')) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Title is required',
        value: '',
        param: 'title',
        location: 'body',
      },
    ];
  } else if (
    title.value.length > 75 &&
    !errorsArr.find((e) => e.param === 'title')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Title must not contain more than 75 characters',
        value: '',
        param: 'title',
        location: 'body',
      },
    ];
  } else if (
    title.value.length < 5 &&
    !errorsArr.find((e) => e.param === 'title')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Title must contain at least 5 characters',
        value: '',
        param: 'title',
        location: 'body',
      },
    ];
  }
  if (!image.value && !errorsArr.find((e) => e.param === 'image')) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Image is required',
        value: '',
        param: 'image',
        location: 'body',
      },
    ];
  }
  function isUrl(s: string) {
    var regexp =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
  }
  if (!isUrl(image.value) && !errorsArr.find((e) => e.param === 'image')) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Image URL must be valid',
        value: '',
        param: 'image',
        location: 'body',
      },
    ];
  }
  if (content.length < 10 || content.length > 10000) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Content must contain between 10 and 10000 characters',
        value: '',
        param: 'content',
        location: 'body',
      },
    ];
  }

  let tagsArray = tags.value ? tags.value.split(',') : [];
  tagsArray = tagsArray.map((tag: string) => {
    return tag.trim();
  });

  if (
    (tagsArray.length === 0 || tagsArray.length > 20) &&
    !errorsArr.find((error) => error.param === 'tags')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'There must be between 1 and 20 tags',
        value: '',
        param: 'tags',
        location: 'body',
      },
    ];
  }
  if (!errorsArr.find((error) => error.param === 'tags')) {
    if (
      tagsArray.find((tag: string) => {
        if (tag.length > 20) return true;
      }) ||
      tagsArray.find((tag: string) => {
        if (tag.length < 4) return true;
      })
    ) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Each tag must contain between 4 and 20 characters',
          value: '',
          param: 'tags',
          location: 'body',
        },
      ];
    }
  }

  if (errorsArr.length > 0) {
    errorCallback(errorsArr);
    console.log(errorsArr);
  } else {
    errorCallback([]);
    successCallback(data);
  }
};

export const validateRegistration = async (
  data: any,
  successCallback: Function,
  errorCallback: Function,
  router: any
) => {
  let errorsArr: {
    value: String;
    msg: String;
    param: String;
    location: String;
  }[] = [];
  const { firstName, lastName, email, password, confirmPassword, adminCode } =
    data;

  if (!firstName.value) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'First name is required',
        value: '',
        param: 'firstName',
        location: 'body',
      },
    ];
  }
  // check if first name only contains letters
  if (
    !/^[a-zA-Z]+$/.test(firstName.value) &&
    !errorsArr.find((e) => e.param === 'firstName')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'First name must contain only letters',
        value: '',
        param: 'firstName',
        location: 'body',
      },
    ];
  }

  if (
    firstName.value.length < 3 &&
    !errorsArr.find((e) => e.param === 'firstName')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'First name must contain at least 3 characters',
        value: '',
        param: 'firstName',
        location: 'body',
      },
    ];
  }
  if (
    firstName.value.length > 20 &&
    !errorsArr.find((e) => e.param === 'firstName')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'First name must not contain more than 20 characters',
        value: '',
        param: 'firstName',
        location: 'body',
      },
    ];
  }

  if (!lastName.value) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Last name is required',
        value: '',
        param: 'lastName',
        location: 'body',
      },
    ];
  }
  // check if last name only contains letters
  if (
    !/^[a-zA-Z]+$/.test(lastName.value) &&
    !errorsArr.find((e) => e.param === 'lastName')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Last name must contain only letters',
        value: '',
        param: 'lastName',
        location: 'body',
      },
    ];
  }

  if (
    lastName.value.length < 3 &&
    !errorsArr.find((e) => e.param === 'lastName')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Last name must contain at least 3 characters',
        value: '',
        param: 'lastName',
        location: 'body',
      },
    ];
  }
  if (
    lastName.value.length > 20 &&
    !errorsArr.find((e) => e.param === 'lastName')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Last name must not contain more than 20 characters',
        value: '',
        param: 'lastName',
        location: 'body',
      },
    ];
  }
  if (!email.value) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Email is required',
        value: '',
        param: 'email',
        location: 'body',
      },
    ];
  }
  if (
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Email must be valid',
        value: '',
        param: 'email',
        location: 'body',
      },
    ];
  }
  if (!password.value) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Password is required',
        value: '',
        param: 'password',
        location: 'body',
      },
    ];
  }
  if (
    password.value.length < 8 &&
    !errorsArr.find((e) => e.param === 'password')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Password must contain at least 8 characters',
        value: '',
        param: 'password',
        location: 'body',
      },
    ];
  }
  if (!confirmPassword.value) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Confirm password is required',
        value: '',
        param: 'confirmPassword',
        location: 'body',
      },
    ];
  }
  if (
    password.value !== confirmPassword.value &&
    !errorsArr.find((e) => e.param === 'confirmPassword')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Passwords must match',
        value: '',
        param: 'confirmPassword',
        location: 'body',
      },
    ];
  }
  if (errorsArr.length > 0) {
    errorCallback(errorsArr);
  } else {
    errorCallback([]);
    await successCallback(data, router, errorCallback);
  }
};
