import { all } from "redux-saga/effects";
import maincategorySagas from "./MaincategorySagas";
import subcategorySagas from "./SubcategorySagas";
import productSagas from "./ProductSagas";
import testimonialSagas from "./TestimonialSagas";
import cartSagas from "./CartSagas";
import checkoutSagas from "./CheckoutSagas";
import wishlistSagas from "./WishlistSagas";
import newsletterSagas from "./NewsletterSagas";
import contactUsSagas from "./contactUsSagas";

export default function* RootSaga() {
  yield all([
    maincategorySagas(),
    subcategorySagas(),
    productSagas(),
    testimonialSagas(),
    cartSagas(),
    checkoutSagas(),
    wishlistSagas(),
    newsletterSagas(),
    contactUsSagas(),
  ]);
}
