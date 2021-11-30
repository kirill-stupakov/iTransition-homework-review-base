const ru = {
  translation: {
    adminPanel: {
      users: "Пользователи",
      filter: "Фильтр",
      sortBy: "Сортировка",
      ordering: "Порядок",
      sortAttributes: {
        createdAt: "Дата регистрации",
        name: "Имя",
        uuid: "UUID",
        isAdmin: "Статус",
        authService: "Сервис регистрации",
      },
      sortOrder: {
        asc: "Возрастание",
        desc: "Убывание",
      },
      noUsersFound: "Пользователи не найдены",
      userCard: {
        makeAdmin: "Сделать админом",
        makeUser: "Сделать пользователем",
      },
    },

    homePage: {
      mostRatedReviews: "Лучшие обзоры",
      mostRecentReviews: "Новые обзоры",
    },

    categories: {
      Movie: "Фильм",
      Book: "Книга",
      Game: "Игра",
    },

    reviewForm: {
      errors: {
        requiredFields: "Пожалуйста, заполните все обязательные поля",
        authorIsIncorrect: "Неверный UUID автора",
        notLoggedIn: "Пожалуйста, авторизуйтесь, чтобы {{action}} обзоры",
      },
      sendAs: "{{action}} обзор как",
      title: {
        name: "Название",
        placeholder: "Введите название",
        subtext: "Обязательное поле. {{charactersLeft}} символов осталось",
      },
      category: {
        name: "Категория",
        placeholder: "Выберите категорию",
        subtext: "Обязательное поле",
      },
      tags: {
        name: "Теги",
        placeholder: "Выберите теги",
        subtext: "Опциональное поле",
      },
      mark: "Оценка",
      images: {
        name: "Картинки",
        subtext: "Опциональное поле. Принимаются только файлы изображений",
      },
      body: {
        name: "Тело обзора",
        placeholder: "Введите тело обзора",
        subtext: {
          charactersLeft:
            "Обязательное поле. {{charactersLeft}} символов осталось",
          supports: "Поддерживает",
        },
        edit: "Редактировать",
        preview: "Предпросмотр",
      },
      loading: "Загрузка...",
    },

    topBar: {
      reviewBase: "База обзоров",
      createReview: "Создать",
      adminPanel: "Администрирование",
      loggedInAs: "Вы вошли как",
      logOut: "Выйти",
      logIn: "Войти",
      search: "Поиск...",
    },

    createReview: {
      action: "Создать",
    },

    editReview: {
      action: "Редактировать",
    },

    reviewCard: {
      edit: "Редактировать",
      delete: "Удалить",
    },

    userPage: {
      admin: "администратор",
      user: "пользователь",
      memberSince: "Дата регистрации: ",
      reviews: "обзоров",
      karma: "кармы",
      filter: "Поиск",
      sortBy: "Сортировка",
      ordering: "Порядок",
      sortAttributes: {
        id: "Дата создания",
        mark: "Оценка",
        rating: "Рейтинг",
      },
      sortOrder: {
        asc: "Возрастание",
        desc: "Убывание",
      },
    },
  },
};

export default ru;
