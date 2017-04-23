export const returnPath = history => {

  const _pathname = (typeof history !== 'undefined' ? typeof history.location.pathname === 'undefined' ? '' : '?next=' + history.location.pathname : '');
  let pathnameSearch = (typeof history !== 'undefined' ?
    (typeof history.location.search === 'undefined' ? '' : _pathname + history.location.search) : '')

  pathnameSearch = (pathnameSearch === '?next=/' ? '' : pathnameSearch);
  pathnameSearch = pathnameSearch.replace(/&/g, '%26');
  pathnameSearch = pathnameSearch.replace(/\?next=\/login/g, '');
  pathnameSearch = pathnameSearch.replace(/%26user_role=null/g, '');

  return pathnameSearch
}
