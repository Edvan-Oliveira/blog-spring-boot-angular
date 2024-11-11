import {createAction, props} from "@ngrx/store";

export const appShowSuccessMessage = createAction('[APP] app show success message');
export const appShowErrorMessage = createAction('[APP] error capture', props<{ error?: any }>());

