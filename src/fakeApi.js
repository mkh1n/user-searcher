import { Server } from "miragejs";
const fakeUsers = [
  { "id": 1, "name": "Janin", "avatarUrl": "https://randomuser.me/api/portraits/med/women/52.jpg" },
  { "id": 2, "name": "Lotta", "avatarUrl": "https://randomuser.me/api/portraits/med/women/30.jpg" },
  { "id": 3, "name": "Sevim", "avatarUrl": "https://randomuser.me/api/portraits/med/women/42.jpg" },
  { "id": 4, "name": "Tristan", "avatarUrl": "https://randomuser.me/api/portraits/med/men/0.jpg" },
  { "id": 5, "name": "Manuela", "avatarUrl": "https://randomuser.me/api/portraits/med/women/26.jpg" },
  { "id": 6, "name": "Filicata", "avatarUrl": "https://randomuser.me/api/portraits/med/women/0.jpg" },
  { "id": 7, "name": "Fortunata", "avatarUrl": "https://randomuser.me/api/portraits/med/women/62.jpg" },
  { "id": 8, "name": "Yahya", "avatarUrl": "https://randomuser.me/api/portraits/med/men/85.jpg" },
  { "id": 9, "name": "Cecilie", "avatarUrl": "https://randomuser.me/api/portraits/med/women/67.jpg" },
  { "id": 10, "name": "Иван", "avatarUrl": "https://randomuser.me/api/portraits/med/men/22.jpg" },
  { "id": 11, "name": "Jhon", "avatarUrl": "https://randomuser.me/api/portraits/med/men/6.jpg" },
  { "id": 12, "name": "Cesar", "avatarUrl": "https://randomuser.me/api/portraits/med/men/18.jpg" },
  { "id": 13, "name": "Michelle", "avatarUrl": "https://randomuser.me/api/portraits/med/women/21.jpg" },
  { "id": 14, "name": "Michel", "avatarUrl": "https://randomuser.me/api/portraits/med/women/40.jpg" },
  { "id": 16, "name": "Игорь", "avatarUrl": "https://randomuser.me/api/portraits/med/men/2.jpg" },
  { "id": 17, "name": "Joe", "avatarUrl": "https://randomuser.me/api/portraits/med/men/5.jpg" },
  { "id": 18, "name": "Karen", "avatarUrl": "https://randomuser.me/api/portraits/med/women/2.jpg" },
  { "id": 19, "name": "Kattie", "avatarUrl": "https://randomuser.me/api/portraits/med/women/15.jpg" },
  { "id": 20, "name": "Mistie", "avatarUrl": "https://randomuser.me/api/portraits/med/women/10.jpg" },
  { "id": 21, "name": "Katrin", "avatarUrl": "https://randomuser.me/api/portraits/med/men/29.jpg" },
  { "id": 22, "name": "Sandy", "avatarUrl": "https://randomuser.me/api/portraits/med/men/0.jpg" },
  { "id": 23, "name": "Frederick", "avatarUrl": "https://randomuser.me/api/portraits/med/men/54.jpg" },
  { "id": 24, "name": "Jeffry", "avatarUrl": "https://randomuser.me/api/portraits/med/men/1.jpg" },
  { "id": 25, "name": "Nikky", "avatarUrl": "https://randomuser.me/api/portraits/med/men/66.jpg" },
  { "id": 26, "name": "Ada", "avatarUrl": "https://randomuser.me/api/portraits/women/75.jpg" },
  { "id": 27, "name": "Boris", "avatarUrl": "https://randomuser.me/api/portraits/men/74.jpg" },
  { "id": 28, "name": "Chloe", "avatarUrl": "https://randomuser.me/api/portraits/women/73.jpg" },
  { "id": 29, "name": "Dmitriy", "avatarUrl": "https://randomuser.me/api/portraits/men/72.jpg" },
  { "id": 30, "name": "Ella", "avatarUrl": "https://randomuser.me/api/portraits/women/71.jpg" },
  { "id": 31, "name": "Fyodor", "avatarUrl": "https://randomuser.me/api/portraits/men/70.jpg" },
  { "id": 32, "name": "Grace", "avatarUrl": "https://randomuser.me/api/portraits/women/69.jpg" },
  { "id": 33, "name": "Henry", "avatarUrl": "https://randomuser.me/api/portraits/men/68.jpg" },
  { "id": 34, "name": "Inna", "avatarUrl": "https://randomuser.me/api/portraits/women/67.jpg" },
  { "id": 35, "name": "Jack", "avatarUrl": "https://randomuser.me/api/portraits/men/66.jpg" },
  { "id": 36, "name": "Kira", "avatarUrl": "https://randomuser.me/api/portraits/women/65.jpg" },
  { "id": 37, "name": "Leonid", "avatarUrl": "https://randomuser.me/api/portraits/men/64.jpg" },
  { "id": 38, "name": "Maria", "avatarUrl": "https://randomuser.me/api/portraits/women/63.jpg" },
  { "id": 39, "name": "Nikolay", "avatarUrl": "https://randomuser.me/api/portraits/men/62.jpg" },
  { "id": 40, "name": "Olga", "avatarUrl": "https://randomuser.me/api/portraits/women/61.jpg" },
  { "id": 41, "name": "Pavel", "avatarUrl": "https://randomuser.me/api/portraits/men/60.jpg" },
  { "id": 42, "name": "Quinn", "avatarUrl": "https://randomuser.me/api/portraits/women/59.jpg" },
  { "id": 43, "name": "Roman", "avatarUrl": "https://randomuser.me/api/portraits/men/58.jpg" },
  { "id": 44, "name": "Sophia", "avatarUrl": "https://randomuser.me/api/portraits/women/57.jpg" },
  { "id": 45, "name": "Timur", "avatarUrl": "https://randomuser.me/api/portraits/men/56.jpg" }

]
const page_size = 9;

function filterUsersByAttributes(users, searchTerm) {
  const upperSearchTerm = searchTerm.toUpperCase();
  return users.filter((user) => {
    for (const key in user) {
      if (key !== "id" && key !== "avatarUrl" && user[key]) {
        const attributeValue = user[key].toString().toUpperCase();
        if (attributeValue.indexOf(upperSearchTerm) > -1) {
          return true;
        }
      }
    }
    return false;
  });
}
const getFakeResponse = (searchTerm = "", page = 1) => {
  const upperSearchTerm = searchTerm.toUpperCase();
  var filteredUsers = searchTerm.length == 0 ? fakeUsers : filterUsersByAttributes(fakeUsers, upperSearchTerm);

  const start = (page - 1) * page_size;
  const end = start + page_size;
  const paginatedUsers = filteredUsers.slice(start, end);

  const nextPageUrl = end < filteredUsers.length ? `/api/users?searchTerm=${searchTerm}&page=${page + 1}` : null;
  const previousPageUrl = start > 0 ? `/api/users?searchTerm=${searchTerm}&page=${page - 1}` : null;

  const fakeResponse = {
    result: paginatedUsers,
    nextPageUrl,
    previousPageUrl
  };
  return fakeResponse;
};

new Server({
  routes() {
    this.namespace = "api";
    this.get("/users", (schema, request) => {
      const { searchTerm = "", page = 1 } = request.queryParams;
      const response = getFakeResponse(searchTerm, Number(page));
      return response;
    });
  }
}).start();