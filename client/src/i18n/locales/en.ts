const en = {
  translation: {
    adminPanel: {
      users: "Users",
      filter: "Filter",
      sortBy: "Sort by",
      ordering: "Ordering",
      sortAttributes: {
        createdAt: "Creation date",
        name: "Name",
        uuid: "UUID",
        isAdmin: "Privileges",
        authService: "Auth service",
      },
      sortOrder: {
        asc: "Ascending",
        desc: "Descending",
      },
      noUsersFound: "No users found",
      userCard: {
        makeAdmin: "Make admin",
        makeUser: "Make user",
      },
    },

    homePage: {
      mostRatedReviews: "Most rated reviews",
      mostRecentReviews: "Most recent reviews",
    },

    categories: {
      Movie: "Movie",
      Book: "Book",
      Game: "Game",
    },

    reviewForm: {
      errors: {
        requiredFields: "Please, fill in all required fields",
        authorIsIncorrect: "Author UUID is incorrect",
        notLoggedIn: "Please, log in to {{action}} reviews",
      },
      sendAs: "{{action}} review as",
      title: {
        name: "Title",
        placeholder: "Your title",
        subtext: "Required. {{charactersLeft}} characters left",
      },
      category: {
        name: "Category",
        placeholder: "Select category",
        subtext: "Required",
      },
      tags: {
        name: "Tags",
        placeholder: "Select tags",
        subtext: "Optional",
      },
      mark: "Mark",
      images: {
        name: "Images",
        subtext: "Optional. Must be of valid types",
      },
      body: {
        name: "Body",
        placeholder: "Your body",
        subtext: {
          charactersLeft: "Required. {{charactersLeft}} characters left",
          supports: "Supports",
        },
        edit: "Edit",
        preview: "Preview",
      },
      loading: "Loading...",
    },

    topBar: {
      reviewBase: "Review-Base",
      createReview: "Create Review",
      adminPanel: "Admin Panel",
      loggedInAs: "Logged in as",
      logOut: "Log out",
      logIn: "Log in",
      search: "Search...",
    },
  },
};

export default en;
