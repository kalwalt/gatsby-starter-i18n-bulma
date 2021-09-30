const getIdJsonUrl = (id, langKey, jsonData) => {
  if (id !== 'undefined') {
    return jsonData[id][langKey];
  } else {
    console.log('missed id in the getIdJsonUrl() function!');
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

const setLangsMenu = (langsMenu, id, basePath, jsonData, langs) => {
  if (id !== 'undefined') {
    if (id === 0) {
      langs.map((lang, index) => {
        langsMenu[index].link = `/` + lang + `/`;
      })
    } else {
      langs.map((lang, index) => {
        langsMenu[index].link = `/` + lang + `/${basePath}` + getIdJsonUrl(id, lang, jsonData) + `/`;
      })
    }
  } else {
    console.log('missed id in the setLangsMenu() function!');
  }
};

module.exports = {
  checkPath, startPath, setLangsMenu
}