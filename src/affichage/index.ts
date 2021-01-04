import categorie, { CategorieState } from './categorie.reducer';
import produit, { ProduitState } from './products.reducer';
import { combineReducers } from 'redux';
//import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';


// import produit, { ProduitState } from '../../modules/products/products.reducer';
// import panier, { PanierState } from '../../modules/panier/panier.reducer';
// import client, {
//   ClientState
// } from '../../entities/client/client.reducer';
// import livraison2, { livraison2State } from './livraison2.reducer';


export interface IRootState {
  readonly produit: ProduitState;
  readonly categorie: CategorieState;

  // readonly client: ClientState;   
  // readonly livraison2: livraison2State;

  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  //readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  produit,
  categorie,
  //client,
  //loadingBar,
  //livraison2,
});

export default rootReducer;  
