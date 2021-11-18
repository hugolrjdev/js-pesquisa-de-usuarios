class SearchController {
  constructor(
    inputSearchId,
    buttonSearchId,
    listUsersId,
    alertsUsersId,
    panelUsersId,
    panelStatisticsId,
    statisticsUsersId
  ) {
    this.api =
      "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";
    this.inputSearch = document.querySelector(inputSearchId);
    this.buttonSearch = document.querySelector(buttonSearchId);
    this.panelUsers = document.querySelector(panelUsersId);
    this.listUsers = document.querySelector(listUsersId);
    this.alertUsers = document.querySelector(alertsUsersId);
    this.countUsers = 0;
    this.panelStatistics = document.querySelector(panelStatisticsId);
    this.statistcsUsers = document.querySelector(statisticsUsersId);
    this.male = 0;
    this.female = 0;
    this.totalAges = 0;
    this.middleAges = [];

    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await fetch(this.api);
      const json = await response.json();
      const { results } = json;

      this.mappedUsers(results);
      this.testModels(results);
    } catch (err) {
      console.error(err);
    }
  }

  mappedUsers(dataUsersApi) {
    //  console.log('data',dataUsersApi)

    let mappedUsers = dataUsersApi.map((user, index) => {
      const {
        name: { first, last },
        dob: { age },
        picture: { thumbnail },
      } = user;

      const { gender } = user;

      //   return { first, last, gender, age, thumbnail };

      return new User(first, last, gender, age, thumbnail);
    });

    this.searchEvents(mappedUsers);
  }

  testModels(dataUsersApi) {
    let users = dataUsersApi;
    let usersMapped = {};

    users.forEach((user) => {
      usersMapped.firstName = user.name.first;
      usersMapped.lastName = user.name.last;
      usersMapped.gender = user.gender;
      usersMapped.age = user.dob.age;
      usersMapped.thumbnail = user.picture.thumbnail;
    });

    const newUser = new User(
      usersMapped.firstName,
      usersMapped.lastName,
      usersMapped.gender,
      usersMapped.age,
      usersMapped.thumbnail
    );
  }

  alertsUsers(countUsersprint) {
    if (this.inputSearch.value === "") {
      this.clearListUsersPrint();
      countUsersprint.innerHTML = `Nenhum usuário filtrado!`;
      this.statistcsUsers.innerHTML = `
            <div class="statistcs">
                <h3>Nada a ser exibido!</h3>
            </div>
            `;
    }

    if (this.listUsers.childNodes.length === 0) {
      countUsersprint.innerHTML = `Nenhum usuário filtrado!`;
    }

    if (this.listUsers.childNodes.length > 0) {
      countUsersprint.innerHTML = `${this.countUsers} Usuário(s) Encontrado(s)`;
    }
  }

  clearListUsersPrint() {
    this.listUsers.textContent = ``;
  }

  clearStatistics() {
    this.statistcsUsers.textContent = ``;
  }

  filterUsers(users) {
    this.countUsers = 0;
    this.male = 0;
    this.female = 0;
    this.totalAges = 0;
    let ages = [];

    users.forEach((user, index) => {
      if (user.firstName.includes(this.inputSearch.value)) {
        this.listUsersPrint(user);
        this.countUsers += 1;
        if (user.gender === "male") this.male += 1;
        if (user.gender === "female") this.female += 1;
        if (user.age) this.totalAges += user.age;
        ages.push(user.age);
      }
      console.log(user.firstName);
    });

    let somar = 0;

    for (let i = 0; i < ages.length; i++) {
      somar += ages[i];
    }

    let meddleAges = somar / ages.length;

    this.statistcsUsersPrint(
      this.male,
      this.female,
      this.totalAges,
      meddleAges
    );
  }

  listUsersPrint(user) {
    let rowList = document.createElement("div");
    rowList.classList.add("row", "result");
    this.listUsers.appendChild(rowList);

    rowList.innerHTML = `

        <div class="row result">
            <div class="col s2 offset-s1">
                <img src="${user.thumbnail}" alt="${user.firstName} ${user.lastName}" class="circle" title="${user.firstName} ${user.lastName}">
            </div>
            <div class="col s9 ">
                <div class="info-user left">
                ${user.firstName} ${user.lastName} - ${user.age} anos
                </div>
            </div>
         </div>
    `;
  }

  statistcsUsersPrint(male, female, totalAges, meddleAges) {
    let statisticResult = document.createElement("div");
    statisticResult.classList.add("statistcs");
    this.statistcsUsers.appendChild(statisticResult);
    statisticResult.innerHTML = `<h3>Nada a ser exibido!</h3>`;

    if (totalAges > 0) {
      statisticResult.innerHTML = `
            <h3>Estatísticas</h3>
            <div class="male">Sexo Masculino: <b>${male}</b></div>
            <div class="fame">Sexo Feminino: <b>${female}</b></div>
            <div class="sum-ages">Soma das Idades: <b>${totalAges}</b></div>
            <div class="middle-ages">Média das Idades: <b>${meddleAges.toFixed(
              2
            )}</b></div>
            `;
    }
  }

  searchEvents(mappedUsers) {
    let countUsersprint = document.createElement("h3");
    countUsersprint.classList.add("count-users");
    this.alertUsers.appendChild(countUsersprint);
    countUsersprint.innerHTML = `Nenhum usuário filtrado!`;

    this.statistcsUsers.innerHTML = `
        <div class="statistcs">
            <h3>Nada a ser exibido!</h3>
        </div>
        `;

    this.inputSearch.addEventListener("keyup", (evt) => {
      this.clearListUsersPrint();
      this.clearStatistics();
      this.filterUsers(mappedUsers);
      this.alertsUsers(countUsersprint);
    });

    this.buttonSearch.addEventListener("click", (evt) => {
      this.clearListUsersPrint();
      this.clearStatistics();
      this.filterUsers(mappedUsers);
      this.alertsUsers(countUsersprint);
    });
  }
}
