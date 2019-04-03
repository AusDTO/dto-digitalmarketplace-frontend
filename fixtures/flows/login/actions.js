import * as util from '../../flows/utils'

/* eslint-disable no-param-reassign */

export const login = async (email, password) => {
  await util.clickLink('Log in')
  await util.matchText('h1', 'Sign in to the Marketplace')

  if (email === undefined) {
    console.log('email check')
    email = process.env.SELLER_EMAIL
  }
  if (password === undefined) {
    password = process.env.SELLER_PASSWORD
  }
  await util.type('input_email_address', { value: email })
  await util.type('input_password', { value: password })
  await util.clickInputButton('Sign in')
}

export const buyerLogin = async (email, password) => {
  if (email === undefined) {
    console.log('buyer email')
    email = process.env.BUYER_EMAIL
  }
  if (password === undefined) {
    console.log('buyer password')
    password = process.env.BUYER_PASSWORD
  }

  await login(email, password)
}

export const sellerLogin = async (email, password) => {
  if (email === undefined) {
    email = process.env.SELLER_EMAIL
  }
  if (password === undefined) {
    password = process.env.SELLER_PASSWORD
  }
  await login(email, password)
}

export const signOut = async () => {
  await util.clickLink('Sign out')
  await util.matchText('h1', 'Sign in to the Marketplace')
}
