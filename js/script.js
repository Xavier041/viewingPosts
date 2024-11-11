const buttonAddPost = document.querySelector(".button-add-post");
const containerAddPost = document.querySelector(".add-post-form");
const postContainer = document.querySelector(".post-container");
const buttonSendPost = document.querySelector(".button-send-post");
const modalError = document.querySelector(".modal-error");
const otherModal = document.querySelector(".other-error");
const closeModalBtn = document.querySelector(".close-modal-btn");
const closeOtherModal = document.querySelector(".close-modal-other");
const closeEditBtn = document.querySelector(".close-edit-btn");
const modalEdit = document.querySelector(".modal-edit");
const buttonSendEdit = document.querySelector(".button-send-edit");
const overlay = document.querySelector(".overlay");
const loadModal = document.querySelector(".load-window");
const main = document.querySelector(".main");
const header = document.querySelector("header");
let textAreaEdit = document.getElementById("textAreaEdit");
let titleEdit = document.getElementById("titleEdit");
let idPostDelets = new Array();
let idPostEdit = new Array();
let faviconDeleteArr;
let faviconEditArr;
let UserIdEdit;
let idEdit;
buttonSendEdit.onclick = function () {
  let url;
  let sendEditData = {
    userId: UserIdEdit,
    title: titleEdit.textContent,
    body: textAreaEdit.value,
  };
  if (idEdit > startLengthArr) {
    console.log(1);
    url = `https://jsonplaceholder.typicode.com/posts/1`;
  } else {
    url = `https://jsonplaceholder.typicode.com/posts/${idEdit}`;
  }
  axios
    .put(url, sendEditData)
    .then((res) => {
      modalEdit.style.display = "none";
      idPostEdit.push(parseInt(idEdit));

      renderPost(posts);
    })
    .catch((error) => {
      console.log(error),
        (otherModal.style.display = "flex"),
        main.classList.add("blur"),
        header.classList.add("blur");
      console.error("Ошибка при выполнении операции:", error);
    });
};

function getFaviconEdit() {
  try {
    faviconEditArr = document.querySelectorAll(".favicon-edit");
    for (let i of faviconEditArr) {
      i.onclick = function (e) {
        let post = i.closest("div");
        editPost(post);
      };
    }
  } catch {
    (modalError.style.display = "none"),
      main.classList.remove("blur"),
      header.classList.remove("blur");
    console.error("Ошибка при выполнении операции:", error);
  }
}
function getFaviconDelete() {
  faviconDeleteArr = document.querySelectorAll(".favicon-delete");

  for (let i of faviconDeleteArr) {
    i.onclick = function (e) {
      let postDel = i.closest("div");
      deletePost(postDel);
    };
  }
}

closeEditBtn.onclick = function () {
  modalEdit.style.display = "none";
  document.body.style.overflow = "auto";
};
closeModalBtn.onclick = function () {
  modalError.style.display = "none";
  main.classList.remove("blur");
  header.classList.remove("blur");
};
closeOtherModal.onclick = function () {
  otherModal.style.display = "none";
  main.classList.remove("blur");
  header.classList.remove("blur");
};
let addPostObj = new Array();
let stateOfAddPost;
let posts = new Array();

const btnReadAll = document.querySelector(".btn-read-all");
const search = document.querySelector(".search-by-posts");
const faviconSearch = document.querySelector(".favicon-search");
const select = document.querySelector("select");

buttonAddPost.onclick = function () {
  postContainer.style.display = "none";
  containerAddPost.style.display = "flex";
  postContainer.style.flexDirection = "column";
};

let authors;
async function addAuthorsList() {
  await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => (authors = res.data));
  console.log(authors);
  for (let i of authors) {
    let option = document.createElement("option");
    option.textContent = i.name;
    option.setAttribute("data-id-option", i.id);

    console.log(typeof option.getAttribute("data-id-option"));
    select.appendChild(option);
  }
}

addAuthorsList();

select.addEventListener("change", function () {
  try {
    let idAuthor;
    for (let i of authors) {
      console.log(select.selectedIndex);
      if (i.id == select.selectedIndex + 1) {
        idAuthor = i.id;
      }
    }

    if (idAuthor === undefined) {
      postContainer.innerHTML = "";
      let didntFind = document.createElement("h4");
      didntFind.textContent = "Ничего не найдено...";
      didntFind.classList.add("didnt-find");
      postContainer.appendChild(didntFind);
      return;
    }
    (postContainer.style.display = "flex"),
      (containerAddPost.style.display = "none"),
      (postContainer.style.flexDirection = "column"),
      getPost(
        `https://jsonplaceholder.typicode.com/posts?userId=${idAuthor}`,
        true,
        true
      );
  } catch (error) {
    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
    console.error("Ошибка при выполнении операции:", error);
  }
});
let stateOfGetPost = false;
const getPost = async (url, isRenderTrue, isEditTrue) => {
  try {
    posts.length = 0;
    if (stateOfAddPost == true && isEditTrue == false) {
      posts.push(addPostObj[addPostObj.length - 1]);
    }
    await axios.get(url).then((resp) => {
      posts.push(...resp.data);
      console.log(posts);
      console.log(resp);
    });
    stateOfGetPost = true;
    if (isRenderTrue == true) {
      await renderPost(posts);
      let titleHeadPosts = document.querySelectorAll(".title-head");
    }
  } catch (error) {
    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
    console.error("Ошибка при выполнении операции:", error);
  }

  console.log(posts);
};

btnReadAll.addEventListener("click", function () {
  try {
    (postContainer.style.display = "flex"),
      (containerAddPost.style.display = "none"),
      (postContainer.style.flexDirection = "column"),
      getPost("https://jsonplaceholder.typicode.com/posts", true, false);
    console.log;
  } catch (error) {
    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
    console.error("Ошибка при выполнении операции:", error);
  }
});

async function getAuthorName(id) {
  let names;
  if (id == 12) {
    names = "Ваш пост";
    return names;
  }

  await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id.toString()}`)
    .then((res) => {
      names = res.data.name;
    });

  return names;
}

async function renderPost(arrPost) {
  hasPostRender = [];
  loadModal.style.display = "flex";
  overlay.style.display = "flex";

  containerAddPost.style.display = "none";
  postContainer.style.display = "flex";

  postContainer.innerHTML = "";

  try {
    for (let i of arrPost) {
      console.log(typeof i.id);
      if (idPostDelets.includes(i.id)) {
        continue;
      }

      let authorName = document.createElement("h5");
      try {
        await getAuthorName(i.userId).then(
          (data) => (authorName.textContent = `Auhor: ${data}`)
        );
      } catch {
        console.log("ошибка в добавлении имени автора");
      }
      let iDelete = document.createElement("i");
      let iEdit = document.createElement("i");
      iEdit.classList.add("fa", "fa-pencil-square", "favicon-edit");
      iEdit.ariaHidden = "true";
      iDelete.classList.add("fa", "fa-trash", "favicon-delete");
      iDelete.ariaHidden = "true";

      let elemPost = document.createElement("div");
      if (idPostEdit.includes(i.id)) {
        elemPost.setAttribute("data-edit", 12);
      }
      elemPost.setAttribute("data-body", i.body);
      elemPost.setAttribute("data-user-id", i.userId);
      elemPost.setAttribute("data-id", i.id);
      let h4 = document.createElement("h4");
      h4.classList.add("title-head");
      elemPost.appendChild(iEdit);
      elemPost.appendChild(iDelete);

      elemPost.classList.add("col-12");
      elemPost.classList.add("post");
      if (i.id === parseInt(idEdit)) {
        h4.innerHTML = `<span class="title"> Title:</span> ${titleEdit.textContent}`;
        console.log(11);
      } else {
        h4.innerHTML = `<span class="title"> Title:</span> ${i.title}`;
      }

      elemPost.appendChild(authorName);

      elemPost.appendChild(h4);

      postContainer.appendChild(elemPost);
    }

    search.style.display = "flex";
    faviconSearch.style.display = "flex";
    let titleHeadPosts = document.querySelectorAll(".title-head");
    for (let i of titleHeadPosts) {
      i.onclick = function (e) {
        let post = i.closest("div");
        console.log(post);
        renderFullPost(post);
        console.log(e);
      };
      loadModal.style.display = "none";
      overlay.style.display = "none";
      setTimeout(getFaviconDelete, 0);
      setTimeout(getFaviconEdit, 0);
    }
  } catch (error) {
    loadModal.style.display = "none";
    overlay.style.display = "none";
    console.error("Ошибка при выполнении операции:", error);

    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
  }
}

faviconSearch.addEventListener("click", function () {
  const searchParametrs = search.value.toLowerCase();
  let arrsearh = posts.filter((x, y) => {
    if (x.title.toLowerCase().includes(searchParametrs)) {
      return x;
    }
  });
  if (arrsearh.length == 0) {
    postContainer.innerHTML = "";
    let didntFind = document.createElement("h4");
    didntFind.textContent = "Ничего не найдено...";
    didntFind.classList.add("didnt-find");
    postContainer.appendChild(didntFind);
    return;
  }

  renderPost(arrsearh).then((res) => console.log(res));
  let titleHeadPosts = document.querySelectorAll(".title-head");
  for (let i of titleHeadPosts) {
    i.onclick = function (e) {
      let post = i.closest("div");
      console.log(i.textContent);
      renderFullPost(post);
      console.log(e);
    };
  }
});
let hasPostRender = new Array();
const renderFullPost = (parrentPost) => {
  try {
    console.log(parrentPost);
    let idPost = parrentPost.getAttribute("data-id");
    if (hasPostRender.includes(idPost)) {
      return;
    }
    let h6 = document.createElement("h6");
    if (parrentPost.hasAttribute("data-edit")) {
      h6.textContent = textAreaEdit.value;
      parrentPost.setAttribute("data-body", textAreaEdit.value);
      parrentPost.appendChild(h6);
    } else {
      console.log(posts);
      for (let i of posts) {
        if (parseInt(idPost) === i.id) {
          console.log(i.body);
          h6.textContent = i.body;
        }
      }
      parrentPost.appendChild(h6);
      hasPostRender.push(idPost);
    }
  } catch (error) {
    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
    console.error("Ошибка при выполнении операции:", error);
  }
};

let startLengthArr;
buttonSendPost.onclick = async function () {
  if (stateOfGetPost == false) {
    await getPost("https://jsonplaceholder.typicode.com/posts", false);
    startLengthArr = posts.length;
  }
  let smallFillField = document.querySelector("small");

  const myPostName = document.getElementById("myPostName").value;
  const myPostTitle = document.getElementById("myPostTitle").value;
  const myPostBody = document.getElementById("myPostBody").value;
  if (!myPostName || !myPostTitle || !myPostBody) {
    smallFillField.style.display = "block";
    return;
  }
  console.log(posts);
  let idOfAddPost = posts.length + 2;
  console.log(idOfAddPost);
  addPostObj.push({
    userId: 12,
    id: idOfAddPost,
    title: myPostTitle,
    body: myPostBody,
  });
  console.log(addPostObj);

  document.getElementById("myPostName").value = "";
  document.getElementById("myPostTitle").value = "";
  document.getElementById("myPostBody").value = "";

  axios
    .post(
      "https://jsonplaceholder.typicode.com/posts/",
      addPostObj[addPostObj.length - 100]
    )
    .then((res) =>
      res.status === 201 ? (stateOfAddPost = true) : (stateOfAddPost = false)
    )
    .catch((err) => {
      (modalError.style.display = "flex"),
        main.classList.add("blur"),
        header.classList.add("blur");
    });
};

function editPost(postForEdit) {
  modalEdit.style.display = "flex";

  UserIdEdit = postForEdit.getAttribute("data-user-id");
  idEdit = postForEdit.getAttribute("data-id");
  console.log(idEdit);
  console.log(UserIdEdit);
  try {
    textAreaEdit.value = "";
    titleEdit.textContent = "";

    let titleValue = postForEdit
      .querySelector(".title-head")
      .textContent.slice(8);
    let bodyValue = postForEdit.getAttribute("data-body");

    console.log(titleValue);
    titleEdit.textContent = titleValue;

    console.log(bodyValue);

    textAreaEdit.value = bodyValue;
    textAreaEdit.style.height = textAreaEdit.scrollHeight + "px";
  } catch (error) {
    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
    console.error("Ошибка при выполнении операции:", error);
  }
}
function deletePost(postForDelete) {
  try {
    let id = parseInt(postForDelete.getAttribute("data-id"));

    for (let i of posts) {
      if (i.id === parseInt(id)) {
        console.log("yeeee");

        axios
          .delete(`https://jsonplaceholder.typicode.com/posts/${toString(id)}`)
          .then((res) => {
            if (res.status === 200) {
              postForDelete.style.display = "none";
              idPostDelets.push(id);
            } else {
              console.log(1);
            }
          });
      }
    }
  } catch (error) {
    (otherModal.style.display = "flex"),
      main.classList.add("blur"),
      header.classList.add("blur");
    console.error("Ошибка при выполнении операции:", error);
  }
}
