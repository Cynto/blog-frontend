const validateCreationForm = (
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
  const title = data.title;
  const image = data.image;
  const tags = data.tags;
  const published = data.published;
  const featured = data.featured;

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
    title.value.length > 50 &&
    !errorsArr.find((e) => e.param === 'title')
  ) {
    errorsArr = [
      ...errorsArr,
      {
        msg: 'Title must have 50 or less characters',
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
        msg: 'Title must have 5 or more characters',
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
        msg: 'Content must be between 10 and 10000 characters',
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
          msg: 'Each tag must have between 4 and 20 characters',
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

export default validateCreationForm;
