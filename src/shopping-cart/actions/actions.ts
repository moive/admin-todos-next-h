// 'use client';

import { getCookie, hasCookie, setCookie } from 'cookies-next';

/*
  cookie: cart
  {
    'uuid-123-1': 4,
    'uuid-123-2': 1,
    'uuid-123-3': 2,
  }
 */
export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}');
    return cookieCart;
  }
  return {};
};

export const addProductCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }
  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie('cart', JSON.stringify(cookieCart));
};
