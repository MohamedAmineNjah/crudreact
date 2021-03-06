import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';

import { ICategorie, defaultValue } from './categorie.model';

export const ACTION_TYPES = {
  SEARCH_CATEGORIES: 'categorie/SEARCH_CATEGORIES',
  FETCH_CATEGORIE_LIST: 'categorie/FETCH_CATEGORIE_LIST',
  FETCH_FILTRED_CATEGORIE_LIST: 'categorie/FETCH_FILTRED_CATEGORIE_LIST',
  FETCH_CATEGORIE: 'categorie/FETCH_CATEGORIE',
  CREATE_CATEGORIE: 'categorie/CREATE_CATEGORIE',
  UPDATE_CATEGORIE: 'categorie/UPDATE_CATEGORIE',
  DELETE_CATEGORIE: 'categorie/DELETE_CATEGORIE',
  SET_BLOB: 'categorie/SET_BLOB',
  RESET: 'categorie/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICategorie>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CategorieState = Readonly<typeof initialState>;

// Reducer

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: CategorieState = initialState, action: { type: any; payload: { data: any; name?: any; contentType?: any; }; }): CategorieState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CATEGORIES):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILTRED_CATEGORIE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORIE):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORIE):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_CATEGORIES):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILTRED_CATEGORIE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIE):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORIE):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORIE):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORIE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        //errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CATEGORIES):
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIE_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_FILTRED_CATEGORIE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORIE):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORIE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORIE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'http://localhost:8080/api/categories';
const apiSearchUrl = 'api/_search/categories';
const filterCategorie = 'sousCategorieId.specified=true';

// Actions

export const getSearchEntities: ICrudSearchAction<ICategorie> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CATEGORIES,
  payload: axios.get<ICategorie>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<ICategorie> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CATEGORIE_LIST,
  payload: axios.get<ICategorie>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getFiltredEntities: ICrudGetAllAction<ICategorie> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILTRED_CATEGORIE_LIST,
  payload: axios.get<ICategorie>(`${apiUrl}?${filterCategorie}`),
});

export const getEntity: ICrudGetAction<ICategorie> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIE,
    payload: axios.get<ICategorie>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICategorie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORIE,
    payload: axios.post(apiUrl, entity)
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICategorie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORIE,
    payload: axios.put(apiUrl, entity)
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICategorie> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORIE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const setBlob = (name: any, data: any, contentType?: any) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
