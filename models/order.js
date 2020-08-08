import Moment from "moment";
export class Order {
  constructor(id, items, amount, date) {
    this.id = id;
    this.items = items;
    this.amount = amount;
    this.date = date;
  }

  get readableDate() {
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   date: "numeric",
    //   hour: "2 digit",
    //   minute: "2 digit",
    // });
    return Moment(this.date).format('MMMM Do YYYY, hh:mm');
    
  }
}
