const getIdJsonUrl = (id, langKey, jsonData) => {
  if (id !== 'undefined') {
    let res;
    switch (langKey) {
      //we get the name of the page according the id 
      case 'en':
        res = jsonData[id].en;
        break;
      case 'it':
        res = jsonData[id].it;
        break;
      default:
        return ' ';
    }
    return res;
  } else {
    console.log('missed id in the getIdUrl() function!');
  }
};

const checkPath = (langKey, id_article, jsonData) => {
  let basename;
  if (id_article !== 'undefined') {
    basename = getIdJsonUrl(id_article, langKey, jsonData);
  }
  return [basename, id_article];
};

const startPath = (langKey, basename, _url) => {
  const lengthLangKey = langKey.length;
  let indx;
  indx = _url.indexOf(basename);
  const basePath = _url.slice(lengthLangKey + 2, indx);
  return basePath;
};

const setLangsMenu = (langsMenu, id, basePath, jsonData) => {
  if (id !== 'undefined') {
    if (id === 0) {
      langsMenu[0].link = `/en/`;
      langsMenu[1].link = `/it/`;
    } else {
      langsMenu[0].link =
        `/en/${basePath}` + getIdJsonUrl(id, 'en', jsonData) + '/';
      langsMenu[1].link =
        `/it/${basePath}` + getIdJsonUrl(id, 'it', jsonData) + '/';
    }
  } else {
    console.log('missed id in the setLangsMenu() function!');
  }
};

module.exports = {
  checkPath, startPath, setLangsMenu
}