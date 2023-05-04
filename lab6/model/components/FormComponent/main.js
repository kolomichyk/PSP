import { Ajax } from "../../ajax/ajax.js";
export class FormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
            <form>
                <div class="mb-3">
                    <div>
                        <button id="showTableButton" type="button" class="btn btn-primary">Выбрать всё</button>
                    </div>
                    <label for="form_id_student" class="form-label">ID студента</label>
                    <input type="text" class="form-control" id="form_id_student" aria-describedby="emailHelp">
                    <button id="SearchButton" type="button" class="btn btn-primary">Найти по ID</button>
                    <button id="DeleteButton" type="button" class="btn btn-primary">Удалить</button>
                </div>
                <div class="mb-3">
                    <label for="form_last_name" class="form-label"> Фамилия </label>
                    <input type="text" class="form-control" id="form_last_name">
                </div>
                <div class="mb-3">
                    <label for="form_first_name" class="form-label"> Имя </label>
                    <input type="text" class="form-control" id="form_first_name">
                </div>
                <button id="UpdateButton" type="button" class="btn btn-primary">Обновить</button>
                <button id="AddButton" type="button" class="btn btn-primary">Добавить</button>
                <h2 id="error"></h2>
            </form>
            `
        )
    }

    addListeners(listener, buttonName) {
        document.getElementById(`${buttonName}`).addEventListener("click", listener);//showTableButton
    }

    clickShowTable() {
        console.log("button show was clicked");
        let ajax = new Ajax();
        console.log(ajax);
        ajax.get('http://localhost:8000/Students', this.showData);
    }

    clickDeleteRecord() {
        console.log("button delete was clicked");
        let ajax = new Ajax();
        console.log(ajax);
        const id = document.getElementById("form_id_student").value;
        ajax.CUD(`http://localhost:8000/DeleteStudents/${id}`);
    }

    clickUpdateRecord() {
        console.log("button update was clicked");
        let ajax = new Ajax();
        console.log(ajax);
        let err = document.getElementById("error");
        const id = document.getElementById("form_id_student").value;
        const last_name = document.getElementById("form_last_name");
        const first_name = document.getElementById("form_first_name");
        console.log(id);
        console.log(last_name.value);
        console.log(first_name.value);
        if (isNaN(parseInt(id))) {
            err.innerHTML = `Введите id`;
        } else if (!last_name.value) {
            err.innerHTML = `Введите фамилию`;
        } else if (!first_name.value) {
            err.innerHTML = `Введите имя`;
        } else {
            err.innerHTML = "Success";
            ajax.CUD(`http://localhost:8000/UpdateStudents/${id}/${last_name.value}/${first_name.value}`);
        }
    }

    clickAddRecord() {
        console.log("button Add was clicked");
        let ajax = new Ajax();
        console.log(ajax);
        const last_name = document.getElementById("form_last_name").value;
        const first_name = document.getElementById("form_first_name").value;
        ajax.CUD(`http://localhost:8000/InsertStudents/${last_name}/${first_name}`);
    }

    clickSearchRecord() {
        console.log("button Search was clicked");
        let ajax = new Ajax();
        console.log(ajax);
        const id = document.getElementById("form_id_student").value;
        ajax.get(`http://localhost:8000/Students/${id}`, this.showData);
    }

    showData(data) {
        const tableElement = document.getElementById("student");
        tableElement.innerHTML = ``;
        tableElement.insertAdjacentHTML('beforeend', `<tr><th>id_student</th><th>Last name</th><th>First name</th>`);
        for (let i = 0; i< data.length; i++) {
            tableElement.insertAdjacentHTML('beforeend', `<tr id="${data[i]['id_student']}"><th>${data[i]['id_student']}</th><th>${data[i]['last_name']}</th><th>${data[i]['first_name']}</th>`);
        }
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(this.clickShowTable.bind(this), 'showTableButton')
        this.addListeners(this.clickDeleteRecord.bind(this), 'DeleteButton')
        this.addListeners(this.clickUpdateRecord.bind(this), 'UpdateButton')
        this.addListeners(this.clickAddRecord.bind(this), 'AddButton')
        this.addListeners(this.clickSearchRecord.bind(this), 'SearchButton')
    }
    
}