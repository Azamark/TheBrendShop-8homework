import { createStore } from "vuex";
import { catalogModule } from "./catalogModule";
import { cartModule } from "./cartModule";
import { apiModule } from "./apiModule";
import { userActions } from "./userActions";

export default createStore({
    modules: {
        catalog: catalogModule,
        cart: cartModule,
        api: apiModule,
        userActions: userActions,
    }
})