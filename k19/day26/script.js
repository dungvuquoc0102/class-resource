async function fetchPosts() {
  const res = await fetch("http://localhost:3000/posts");
  const data = await res.json();
  return data;
}

async function createPost(post) {
  const res = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
}

async function updatePost(id, post) {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
}

async function deletePost(id) {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

async function searchPosts(query) {
  const res = await fetch(`http://localhost:3000/posts?title=${query}`);
  const data = await res.json();
  return data;
}

const postList = document.querySelector("#post-list");
const addPostBtn = document.querySelector("#add-post");
const searchPostBtn = document.querySelector("#search-post");

addPostBtn.addEventListener("click", async () => {
  const titleInput = document.querySelector(".title");
  const authorInput = document.querySelector(".author");
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (title && author) {
    await createPost({ title, author });
    renderPosts();
    titleInput.value = "";
    authorInput.value = "";
    titleInput.focus();
  }
});

searchPostBtn.addEventListener("click", async () => {
  const searchInput = document.querySelector("#search-input");
  const query = searchInput.value.trim();
  if (query) {
    const posts = await searchPosts(query);
    postList.innerHTML = "";
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.textContent = `Title: ${post.title} - Author: ${post.author}`;
      postList.appendChild(li);
    });
  } else {
    renderPosts();
  }
});

async function renderPosts() {
  postList.innerHTML = "";
  const posts = await fetchPosts();
  posts.forEach((post) => {
    const li = document.createElement("li");

    li.innerHTML = `
    <div class="post-item">
      <div>
        <h3>Title: ${post.title}</h3>
        <p>Author: ${post.author}</p>
      </div>
      <div>
        <button class="edit-btn">Sửa</button>
        <button class="delete-btn">Xóa</button>
      </div>
    </div>
    `;
    postList.appendChild(li);

    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", async () => {
      const newTitle = prompt("Nhập tiêu đề mới", post.title);
      if (newTitle) {
        await updatePost(post.id, { title: newTitle });
        renderPosts();
      }
    });
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", async () => {
      if (confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
        await deletePost(post.id);
        renderPosts();
      }
    });
  });
}

renderPosts();

// Sử dụng json-server, fetch với method POST tạo giao diện hiển thị danh sách comment.
// Bên trên danh sách có form thêm mới comment với 2 trường: tên người comment và nội dung comment.
// Khi bấm nút thêm mới thì comment mới nhất sẽ hiển thị ngay lập tức và nằm trên cùng.
