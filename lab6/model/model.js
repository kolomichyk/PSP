import { TableComponent } from "./components/table/main.js";
import { ButtonShowTable} from "./components/buttonShowTable/main.js"
import { Ajax } from "./ajax/ajax.js";
import { FormComponent } from "./components/FormComponent/main.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTMLNote(data, i) {
        return (
            `
            
            `
        )
    }

    // showData(data) {
    //     const tableElement = document.getElementById("student");
    //     for (let i = 0; i< data.length; i++) {
    //         tableElement.insertAdjacentHTML('beforeend', `<tr id="${data[i]['id_student']}"><th>${data[i]['id_student']}</th><th>${data[i]['last_name']}</th><th>${data[i]['first_name']}</th>`);
    //     }
    // }

    clickShowTable() {
        console.log("button show was clicked");
        let ajax = new Ajax();
        console.log(ajax);
        ajax.get('http://localhost:8000/Students', this.showData);
    }

    render() {
        this.parent.innerHTML = '';
        const table = new TableComponent(this.parent);
        const buttonShowTable = new ButtonShowTable(this.parent);
        const formComponent = new FormComponent(this.parent);

        table.render();
        //buttonShowTable.render(this.clickShowTable.bind(this));
        formComponent.render();
    }
}