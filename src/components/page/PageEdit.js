import React from 'react'
import "./PageEdit.css";
import { useSelector } from 'react-redux'
import { updateAccount } from '../../redux/account/accountActions';
import { Formik, Form, Field, FieldArray } from 'formik'
import store from '../../redux/store'
import { useParams } from "react-router-dom"
import RowEdit from './RowEdit';


const PageEdit = () => {
  const { name } = useParams();


  const applyPage = (modifiedPage, account) => {

    const page = account.pages.find(x => x.id === modifiedPage.id);
    const index = account.pages.inexOf(page);
    account.pages[index] = modifiedPage;

  }

  const onSubmit = (values, actions) => {
    let account = JSON.parse(JSON.stringify(store.getState().accountData.account));
    applyPage(values.page, account)
    updateAccount(account);
  }

  const page = useSelector(state => {
    const a = state.accountData.account;
    if (!a || !a.pages) {
      return undefined;
    }

    return a.pages.find(page => page.name === name);

  });

  if (!page) {
    return <div>Loading</div>
  }

  return (
    <div>
      <Formik
        initialValues={{ page: page }}
        onSubmit={onSubmit}
      >{({ values }) => (
        <Form>
          <FieldArray
            name="rows"
            render={arrayHelpers => (
              <div>
                {values.page && values.page.rows.length > 0 ? (
                  values.page.rows.map((row, index) => (
                    <RowEdit row={row}/>
                    ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push({id: '', name: '', columns: []})}>
                    Add a row
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />


        </Form>
      )}
      </Formik>
    </div >)
}

export default PageEdit;