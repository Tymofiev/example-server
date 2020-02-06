import { createAction } from 'redux-actions'
import {
	FETCH_EXPENSES_START,
	FETCH_EXPENSES_SUCCESS,
	SAVE_EXPENSE,
} from '../actions/types'

const saveExpense = createAction(SAVE_EXPENSE)

export { saveExpense }
