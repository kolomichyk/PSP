import { SortButtonComponent } from "../../components/sort-button/index.js";
import { UndoSortButtonComponent } from "../../components/UndoSort-button/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    async getData() {
        let arr = await urls.getGroupMembers(groupId);
        return arr.response.items;
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }



    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        let data = await this.getData();
        this.renderData(data);
        const sortButton = new SortButtonComponent(this.parent);
        sortButton.render(this.clickSort.bind(this));
        const undoSortButton = new UndoSortButtonComponent(this.parent);
        undoSortButton.render(this.clickUndoSort.bind(this));

    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickUndoSort() {
        this.render();
    }

    async clickSort() {
        console.log("Button sort was clicked");
        let arr = await this.getData();
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length-1-i; j++) {
                if (arr[j]['last_name'] > arr[j+1]['last_name']) {
                    let tmp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = tmp;
                }
            }
        }
        console.log(arr);
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.renderData(arr);
        const sortButton = new SortButtonComponent(this.parent);
        sortButton.render(this.clickSort.bind(this));
        const undoSortButton = new UndoSortButtonComponent(this.parent);
        undoSortButton.render(this.clickUndoSort.bind(this));
    }
}
