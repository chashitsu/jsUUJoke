const jokeCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000)
});

const jokeListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const jokeGetDtoInType = shape({
  id: id().isRequired()
});

const jokeDeleteDtoInType = shape({
  id: id().isRequired()
});

const jokeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  text: uu5String(4000),
  categoryIdList: array(id(), 10),
  image: binary(),
  deleteImage: boolean()
});
