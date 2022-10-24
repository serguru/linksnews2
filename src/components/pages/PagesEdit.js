import React from 'react'
import "./PagesEdit.css";
import { useSelector } from 'react-redux'
import { updateAccount } from '../../redux/account/accountActions';
import { Formik, Form, Field, FieldArray } from 'formik'
import store from '../../redux/store'


const PagesEdit = () => {

  const applyPages = (modifiedPages, account) => {

    // removed
    account.pages = account.pages.filter(page => modifiedPages.find(p => p.id && p.id === page.id));
    // updated
    account.pages.forEach(page => {
      const newPage = modifiedPages.find(modifiedPage => page.id === modifiedPage.id);
      if (!newPage) {
        return;
      }
      page.name = newPage.name;
    })
    // add ids
    const newPages = [];
    modifiedPages
      .filter(page => !page.id)
      .forEach(page => {
        newPages.push({id: '', name: page.name, rows: []})
      });
    // added
    if (newPages.length === 0) {
      return;
    }
    account.pages.push(...newPages);
  }

  const onSubmit = (values, actions) => {
    let account = JSON.parse(JSON.stringify(store.getState().accountData.account));
    applyPages(values.pages, account)
    updateAccount(account);
  }

  const pages = useSelector(state => {
    const a = state.accountData.account;
    if (!a || !a.pages) {
      return undefined;
    }
    const result = []

    a.pages.forEach(page => {
      result.push({
        id: page.id,
        name: page.name
      })
    })

    return result;
  });

  if (!pages) {
    return <div>Loading</div>
  }

  return (
    <div>
      <Formik
        initialValues={{ pages: pages }}
        onSubmit={onSubmit}
      >{({ values }) => (
        <Form>
          <FieldArray
            name="pages"
            render={arrayHelpers => (
              <div>
                {values.pages && values.pages.length > 0 ? (
                  values.pages.map((page, index) => (
                    <div key={index}>
                      <Field name={`pages[${index}].name`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a page from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    Add a page
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

export default PagesEdit;