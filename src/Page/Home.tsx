import { Header } from "../Components/Header";
import { Productlist } from "../Components/Product-List(parent)-n-Card/ProductList";
import { Searchbar } from "../Components/SearchBar";
export function Home() {
  return (
    <>
      <Header/>
        <Searchbar/>
     <Productlist/>
    </>
  );

}