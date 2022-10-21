import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAccount } from '../redux'

function Pages ({ data, fetchAccount }) {

  useEffect(() => {
    fetchAccount()
  }, [])

  return data.loading ? (
    <h2>Loading</h2>
  ) : data.error ? (
    <h2>{data.error}</h2>
  ) : (
    <div>
      <h2>Account</h2>
      <div>
        {
          JSON.stringify(data.account)
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAccount: () => dispatch(fetchAccount())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages)
